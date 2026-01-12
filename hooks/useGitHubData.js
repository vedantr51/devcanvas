"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchUser, fetchRepos, RateLimitError, UserNotFoundError } from "@/lib/github";
import { getCache, setCache, getCacheKey } from "@/lib/cache";
import { normalizeUser, normalizeRepo, getTopRepos, deriveSkills } from "@/lib/normalize";

/**
 * Custom hook for fetching and managing GitHub data
 * Handles loading, error states, caching, and request deduplication
 * @param {string} username - GitHub username to fetch
 * @returns {Object} { user, repos, topRepos, skills, loading, error, refetch }
 */
export function useGitHubData(username) {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [topRepos, setTopRepos] = useState([]);
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        if (!username) {
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Check cache first
            const cachedUser = getCache(getCacheKey(username, "user"));
            const cachedRepos = getCache(getCacheKey(username, "repos"));

            let userData, reposData;

            if (cachedUser && cachedRepos) {
                userData = cachedUser;
                reposData = cachedRepos;
            } else {
                // Fetch fresh data
                const [rawUser, rawRepos] = await Promise.all([
                    fetchUser(username),
                    fetchRepos(username),
                ]);

                // Normalize data
                userData = normalizeUser(rawUser);
                reposData = rawRepos.map(normalizeRepo);

                // Cache the results
                setCache(getCacheKey(username, "user"), userData);
                setCache(getCacheKey(username, "repos"), reposData);
            }

            // Derive computed data
            const top = getTopRepos(reposData, 6);
            const derivedSkills = deriveSkills(reposData);

            setUser(userData);
            setRepos(reposData);
            setTopRepos(top);
            setSkills(derivedSkills);
        } catch (err) {
            if (err instanceof RateLimitError) {
                setError({
                    type: "rate_limit",
                    message: err.message,
                    resetTime: err.resetTime,
                });
            } else if (err instanceof UserNotFoundError) {
                setError({
                    type: "not_found",
                    message: err.message,
                });
            } else if (err.name === "TypeError" && err.message.includes("fetch")) {
                setError({
                    type: "network",
                    message: "Network error. Please check your connection.",
                });
            } else {
                setError({
                    type: "unknown",
                    message: "Something went wrong. Please try again.",
                });
            }
        } finally {
            setLoading(false);
        }
    }, [username]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        // Clear cache for this user before refetching
        if (typeof window !== "undefined" && username) {
            localStorage.removeItem(`devcanvas_${username.toLowerCase()}_user`);
            localStorage.removeItem(`devcanvas_${username.toLowerCase()}_repos`);
        }
        fetchData();
    }, [fetchData, username]);

    return {
        user,
        repos,
        topRepos,
        skills,
        loading,
        error,
        refetch,
    };
}
