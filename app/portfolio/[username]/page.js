"use client";

import { useState, useEffect } from "react";
import { useGitHubData } from "@/hooks/useGitHubData";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { SkillsSection } from "@/components/portfolio/SkillsSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { ContactSection } from "@/components/portfolio/ContactSection";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { use } from "react";

export default function PortfolioPage({ params }) {
    const resolvedParams = use(params);
    const { username } = resolvedParams;
    const { user, topRepos, skills, loading, error, refetch } = useGitHubData(username);

    // Scroll state for navbar animation
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Loading state
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

    // Error state
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

    // Empty state
    if (!user) {
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
        <main className="min-h-screen bg-[#f8fafc]">
            {/* Morphing Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center">
                <div
                    className="flex items-center justify-between backdrop-blur-md"
                    style={{
                        width: scrolled ? "min(100% - 48px, 900px)" : "100%",
                        margin: scrolled ? "16px auto" : "0",
                        padding: scrolled ? "12px 24px" : "16px 48px",
                        borderRadius: scrolled ? "16px" : "0",
                        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.95)",
                        boxShadow: scrolled
                            ? "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)"
                            : "0 1px 2px rgba(0, 0, 0, 0.05)",
                        borderBottom: scrolled ? "none" : "1px solid #e2e8f0",
                        border: scrolled ? "1px solid rgba(255, 255, 255, 0.5)" : "none",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                >
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                            <span className="text-white font-bold text-sm">D</span>
                        </div>
                        <span className="text-lg font-bold text-[#0f172a]">DevCanvas</span>
                    </Link>
                    <a
                        href={`https://github.com/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Button variant="primary" size="sm">
                            View GitHub
                        </Button>
                    </a>
                </div>
            </nav>

            {/* Portfolio Sections */}
            <HeroSection user={user} skills={skills} repos={topRepos} />
            <SkillsSection skills={skills} />
            <ProjectsSection repos={topRepos} />
            <ContactSection user={user} />

            {/* Footer */}
            <footer className="py-10 px-6 md:px-12 text-center bg-white border-t border-[#e2e8f0]">
                <p className="text-sm text-[#94a3b8]">
                    Portfolio generated with{" "}
                    <Link href="/" className="text-[#6366f1] font-semibold hover:underline">
                        DevCanvas
                    </Link>
                </p>
            </footer>
        </main>
    );
}
