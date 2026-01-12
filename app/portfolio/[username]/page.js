"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useGitHubData } from "@/hooks/useGitHubData";
import { TemplateRenderer } from "@/components/templates/TemplateRenderer";
import { FloatingTemplateSwitcher } from "@/components/FloatingTemplateSwitcher";
import { PortfolioEditor } from "@/components/PortfolioEditor";
import { mergePortfolioData } from "@/lib/portfolioModel";
import { decodePortfolioState } from "@/lib/urlCompression";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { use } from "react";

export default function PortfolioPage({ params }) {
    const resolvedParams = use(params);
    const { username } = resolvedParams;
    const searchParams = useSearchParams();
    const { user, topRepos, skills, loading, error, refetch } = useGitHubData(username);

    const [resumeData, setResumeData] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);

    // Editor State
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [overrides, setOverrides] = useState({});

    const template = searchParams.get("template") || "modern-dev";
    const isEditMode = searchParams.get("edit") === "true";

    // Load Session Data
    useEffect(() => {
        const storedResume = sessionStorage.getItem(`devcanvas_resume_${username.toLowerCase()}`);
        if (storedResume) {
            try {
                setResumeData(JSON.parse(storedResume));
            } catch (e) {
                console.error("Failed to parse stored resume data:", e);
            }
        }
    }, [username]);

    // Load URL Overrides
    useEffect(() => {
        const dataParam = searchParams.get("data");
        if (dataParam) {
            const decoded = decodePortfolioState(dataParam);
            if (decoded) setOverrides(decoded);
        }
    }, [searchParams]); // Stable dependency

    // Merge Data
    useEffect(() => {
        if (user && topRepos) {
            const githubData = {
                name: user.name,
                username: user.username,
                bio: user.bio,
                avatarUrl: user.avatarUrl,
                email: user.email,
                blog: user.blog,
                twitterUsername: user.twitterUsername,
                publicRepos: user.publicRepos,
                createdAt: user.createdAt,
            };

            // 1. Base Resume (Session or URL Skills)
            const urlSkills = searchParams.get("skills")?.split(",").filter(Boolean) || [];
            const baseResumeData = resumeData || (urlSkills.length > 0 ? { skills: urlSkills } : null);

            // 2. Apply Overrides (Editor Data)
            // Map 'bio' from editor to 'summary' for model
            const mergedResumeData = {
                ...(baseResumeData || {}),
                ...overrides,
                summary: overrides.bio !== undefined ? overrides.bio : (baseResumeData?.summary || ""),
                name: overrides.name !== undefined ? overrides.name : (baseResumeData?.name || ""),
                experience: overrides.experience !== undefined ? overrides.experience : (baseResumeData?.experience || []),
            };

            const merged = mergePortfolioData(
                githubData,
                mergedResumeData,
                topRepos,
                skills,
                template
            );

            // Apply email override to contact if present
            if (overrides.email) {
                merged.contact = {
                    ...merged.contact,
                    email: overrides.email,
                };
            }

            setPortfolioData(merged);
        }
    }, [user, topRepos, skills, resumeData, template, searchParams.toString(), overrides]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7] flex flex-col items-center justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <Spinner size="lg" />
                    <p className="text-white/80 mt-4 font-medium">Generating portfolio...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center">
                <ErrorMessage error={error} onRetry={refetch} />
                <Link href="/" className="mt-4">
                    <Button variant="ghost">← Back home</Button>
                </Link>
            </div>
        );
    }

    if (!user || !portfolioData) {
        return (
            <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center gap-4">
                <p className="text-[#475569]">No data found for @{username}</p>
                <Link href="/">
                    <Button variant="secondary">Try another username</Button>
                </Link>
            </div>
        );
    }

    return (
        <>
            {/* Template Switcher - Only in Edit Mode */}
            {isEditMode && template !== "github-default" && <FloatingTemplateSwitcher />}

            {/* Universal Edit Button - Only in Edit Mode */}
            {isEditMode && (
                <button
                    onClick={() => setIsEditorOpen(true)}
                    className="fixed bottom-6 left-6 z-50 p-4 bg-white text-slate-800 rounded-full shadow-2xl shadow-purple-500/10 border border-slate-200 flex items-center gap-2 hover:scale-105 transition-transform"
                    title="Edit Content"
                >
                    <span>✏️</span>
                    <span className="font-medium text-sm">Edit Content</span>
                </button>
            )}

            <PortfolioEditor
                isOpen={isEditorOpen}
                setIsOpen={setIsEditorOpen}
                initialData={portfolioData}
                onUpdate={setOverrides}
            />

            <TemplateRenderer
                templateName={template}
                data={portfolioData}
                projects={topRepos}
            />
        </>
    );
}
