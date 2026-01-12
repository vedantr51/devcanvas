"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getTemplateMetadata } from "@/lib/portfolioModel";
import { templatePreviews } from "@/components/TemplateSelector";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingTemplateSwitcher() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentTemplate = searchParams.get("template") || "modern-dev";

    // Exclude GitHub Default template from the switcher since this is only for resume-based views
    const templates = getTemplateMetadata().filter(t => t.id !== "github-default");

    const handleSelect = (templateId) => {
        const params = new URLSearchParams(searchParams);
        params.set("template", templateId);
        router.replace(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-black text-white rounded-full shadow-2xl shadow-purple-500/20 border border-white/10 flex items-center gap-2 group"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium text-sm">
                    Change Template
                </span>
            </motion.button>

            {/* Modal/Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.9 }}
                            className="fixed bottom-24 right-6 w-[90vw] md:w-[480px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl z-50 p-6"
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900">Select Template</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {templates.map((template) => {
                                    const preview = templatePreviews[template.id];
                                    const isSelected = currentTemplate === template.id;

                                    return (
                                        <button
                                            key={template.id}
                                            onClick={() => handleSelect(template.id)}
                                            className={`
                                                relative p-3 rounded-xl text-left border transition-all duration-200
                                                ${isSelected
                                                    ? "border-purple-600 bg-purple-50 ring-1 ring-purple-600"
                                                    : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                                                }
                                            `}
                                        >
                                            <div
                                                className={`
                                                    w-full aspect-video rounded-lg mb-2 flex items-center justify-center
                                                    bg-gradient-to-br ${preview?.gradient || "from-gray-100 to-gray-200"}
                                                `}
                                                style={{ color: preview?.accent }}
                                            >
                                                {preview?.icon}
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className={`text-sm font-semibold ${isSelected ? "text-purple-700" : "text-gray-900"}`}>
                                                    {template.name}
                                                </span>
                                                {template.recommended && (
                                                    <span className="text-[10px] uppercase font-bold text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded">
                                                        Pro
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                {template.description}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
