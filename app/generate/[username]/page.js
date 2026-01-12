"use client";

import { use } from "react";
import Link from "next/link";
import { GeneratorFlow } from "@/components/GeneratorFlow";

export default function GeneratePage({ params }) {
    const resolvedParams = use(params);
    const { username } = resolvedParams;

    return (
        <main className="min-h-screen bg-[#f8fafc]">
            {/* Header */}
            <header className="w-full px-6 md:px-12 py-4 flex items-center justify-between border-b border-[#e2e8f0] bg-white">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
                        <span className="text-white font-bold text-sm">D</span>
                    </div>
                    <span className="text-lg font-bold text-[#0f172a]">DevCanvas</span>
                </Link>
                <div className="text-sm text-[#64748b]">
                    Creating portfolio for <span className="font-medium text-[#0f172a]">@{username}</span>
                </div>
            </header>

            {/* Generator Flow */}
            <div className="px-6 md:px-12 py-12">
                <GeneratorFlow username={username} />
            </div>
        </main>
    );
}
