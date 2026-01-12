"use client";

import { useState } from "react";
import { getTemplateMetadata } from "@/lib/portfolioModel";

export const templatePreviews = {
    "minimal-pro": {
        gradient: "from-gray-100 to-gray-300",
        accent: "#1f2937",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM10 4v16M4 14h6" />
            </svg>
        ),
    },
    "modern-dev": {
        gradient: "from-[#2e1065] to-[#7c3aed]",
        accent: "#ffffff",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
    "resume-plus": {
        gradient: "from-yellow-50 to-yellow-100",
        accent: "#ca8a04",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
    },
    "case-study": {
        gradient: "from-gray-50 to-white",
        accent: "#0ea5e9",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        ),
    },
    "creative-showcase": {
        gradient: "from-black to-gray-900",
        accent: "#22c55e",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    "github-default": {
        gradient: "from-[#8b5cf6] to-[#a855f7]",
        accent: "#ffffff",
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
        ),
    },
};

export function TemplateSelector({ selected, onSelect, onContinue, hasResume = true }) {
    const [hoveredTemplate, setHoveredTemplate] = useState(null);
    const allTemplates = getTemplateMetadata();

    // If no resume uploaded, restrict to only the GitHub Default template.
    // If resume uploaded, exclude the GitHub Default template as it ignores resume data.
    const templates = hasResume
        ? allTemplates.filter(t => t.id !== "github-default")
        : allTemplates.filter(t => t.id === "github-default");

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
                    Choose your style
                </h2>
                <p className="text-[#64748b]">
                    Each template uses the same data, presented differently
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => {
                    const preview = templatePreviews[template.id];
                    const isSelected = selected === template.id;
                    const isHovered = hoveredTemplate === template.id;

                    return (
                        <button
                            key={template.id}
                            onClick={() => onSelect(template.id)}
                            onMouseEnter={() => setHoveredTemplate(template.id)}
                            onMouseLeave={() => setHoveredTemplate(null)}
                            className={`
                                relative p-4 rounded-2xl text-left transition-all duration-200
                                ${isSelected
                                    ? "ring-2 ring-[#6366f1] ring-offset-2 shadow-lg"
                                    : "hover:shadow-md border border-[#e2e8f0]"
                                }
                            `}
                        >
                            {template.recommended && (
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-[#6366f1] text-white text-xs font-medium rounded-full">
                                    Recommended
                                </span>
                            )}

                            <div
                                className={`
                                    w-full aspect-[4/3] rounded-xl mb-3 flex items-center justify-center
                                    bg-gradient-to-br ${preview?.gradient || "from-gray-100 to-gray-200"}
                                    transition-transform duration-200
                                    ${isHovered || isSelected ? "scale-[1.02]" : ""}
                                `}
                                style={{ color: preview?.accent || "#0f172a" }}
                            >
                                {preview?.icon}
                            </div>

                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-[#0f172a]">
                                    {template.name}
                                </h3>
                                {isSelected && (
                                    <svg className="w-5 h-5 text-[#6366f1]" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-xs text-[#64748b]">
                                {template.description}
                            </p>
                            <span className="inline-block mt-2 px-2 py-0.5 bg-[#f1f5f9] text-[#64748b] text-xs rounded">
                                {template.style}
                            </span>
                        </button>
                    );
                })}
            </div>

            {selected && (
                <div className="mt-8 text-center">
                    <button
                        onClick={onContinue}
                        className="px-8 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200 hover:-translate-y-0.5"
                    >
                        Generate Portfolio →
                    </button>
                </div>
            )}
        </div>
    );
}
