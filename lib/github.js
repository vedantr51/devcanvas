const GITHUB_API = "https://api.github.com";

// In-flight request tracking for deduplication
const inFlightRequests = new Map();

/**
 * Custom error types for better error handling
 */
export class GitHubError extends Error {
    constructor(message, status, resetTime = null) {
        super(message);
        this.name = "GitHubError";
        this.status = status;
        this.resetTime = resetTime;
    }
}

export class RateLimitError extends GitHubError {
    constructor(resetTime) {
        const resetDate = new Date(resetTime * 1000);
        super(
            `Rate limit exceeded. Resets at ${resetDate.toLocaleTimeString()}`,
            403,
            resetTime
        );
        this.name = "RateLimitError";
    }
}

export class UserNotFoundError extends GitHubError {
    constructor(username) {
        super(`User "${username}" not found`, 404);
        this.name = "UserNotFoundError";
    }
}

/**
 * Fetch with request deduplication
 * Prevents duplicate API calls for the same URL during a session
 */
async function fetchWithDedup(url) {
    if (inFlightRequests.has(url)) {
        return inFlightRequests.get(url);
    }

    const promise = fetch(url, {
        headers: {
            Accept: "application/vnd.github.v3+json",
        },
    }).finally(() => {
        inFlightRequests.delete(url);
    });

    inFlightRequests.set(url, promise);
    return promise;
}

/**
 * Handle GitHub API response errors
 */
async function handleResponse(response, username = "") {
    if (response.ok) {
        return response.json();
    }

    if (response.status === 403) {
        const resetTime = response.headers.get("X-RateLimit-Reset");
        throw new RateLimitError(resetTime);
    }

    if (response.status === 404) {
        throw new UserNotFoundError(username);
    }

    throw new GitHubError(`GitHub API error: ${response.statusText}`, response.status);
}

/**
 * Fetch GitHub user profile
 * @param {string} username
 * @returns {Promise<Object>} Raw GitHub user data
 */
export async function fetchUser(username) {
    const response = await fetchWithDedup(`${GITHUB_API}/users/${username}`);
    return handleResponse(response, username);
}

/**
 * Fetch user's public repositories
 * @param {string} username
 * @param {number} perPage - Number of repos to fetch (max 100)
 * @returns {Promise<Array>} Raw GitHub repos data
 */
export async function fetchRepos(username, perPage = 100) {
    const response = await fetchWithDedup(
        `${GITHUB_API}/users/${username}/repos?per_page=${perPage}&sort=updated`
    );
    return handleResponse(response, username);
}

/**
 * Fetch languages for a specific repository
 * @param {string} repoFullName - Format: username/repo-name
 * @returns {Promise<Object>} Language breakdown in bytes
 */
export async function fetchLanguages(repoFullName) {
    const response = await fetchWithDedup(
        `${GITHUB_API}/repos/${repoFullName}/languages`
    );
    return handleResponse(response);
}
