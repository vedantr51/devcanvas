"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { encodePortfolioState } from "@/lib/urlCompression";

export function PortfolioEditor({ initialData, onUpdate, isOpen, setIsOpen }) {
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        email: "",
        experience: [],
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || "",
                bio: initialData.summary || "",
                email: initialData.contact?.email || "",
                experience: initialData.experience || [],
            });
        }
    }, [initialData]);

    const handleChange = (field, value) => {
        const updated = { ...formData, [field]: value };
        setFormData(updated);
        // Real-time preview update
        onUpdate(updated);
    };

    const handleExperienceChange = (index, field, value) => {
        const newExp = [...formData.experience];
        newExp[index] = { ...newExp[index], [field]: value };
        handleChange("experience", newExp);
    };

    const addExperience = () => {
        const newExp = [...formData.experience, { role: "Role", company: "Company", duration: "Dates", description: [] }];
        handleChange("experience", newExp);
    };

    const removeExperience = (index) => {
        const newExp = formData.experience.filter((_, i) => i !== index);
        handleChange("experience", newExp);
    };

    const [showShareModal, setShowShareModal] = useState(false);

    const handleSave = () => {
        // Encode current state including email
        const encoded = encodePortfolioState({
            name: formData.name,
            bio: formData.bio,
            email: formData.email,
            experience: formData.experience,
        });

        // Build URL from current location (preserves template and edit params)
        const url = new URL(window.location.href);
        url.searchParams.set("data", encoded);

        // Clear legacy params
        url.searchParams.delete("name");
        url.searchParams.delete("skills");

        // Keep edit=true so user stays in builder mode
        url.searchParams.set("edit", "true");

        // Update browser URL without reloading
        window.history.replaceState({}, "", url.toString());

        return url.toString();
    };

    const handleShare = () => {
        // First save the current state
        handleSave();

        // Create a CLEAN shareable URL (without edit mode)
        const encoded = encodePortfolioState({
            name: formData.name,
            bio: formData.bio,
            email: formData.email,
            experience: formData.experience,
        });

        const shareUrl = new URL(window.location.href);
        shareUrl.searchParams.set("data", encoded);
        shareUrl.searchParams.delete("edit"); // Remove edit mode for clean preview
        shareUrl.searchParams.delete("name");
        shareUrl.searchParams.delete("skills");

        navigator.clipboard.writeText(shareUrl.toString());
        setShowShareModal(true);
    };

    return (
        <AnimatePresence>
            {/* Share Success Modal */}
            {showShareModal && (
                <motion.div
                    key="share-modal-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowShareModal(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl relative"
                    >
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                            ✓
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Link Copied!</h3>
                        <p className="text-slate-500 mb-6 font-medium">
                            Your portfolio is saved and ready to share.
                        </p>
                        <button
                            onClick={() => setShowShareModal(false)}
                            className="w-full py-3 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors shadow-lg"
                        >
                            Awesome
                        </button>
                    </motion.div>
                </motion.div>
            )}

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="drawer-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        key="drawer-panel"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[500px] bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-slate-800">Edit Portfolio</h2>
                                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Identity */}
                                <section className="space-y-4">
                                    <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Identity</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Display Name</label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Professional Bio/Summary</label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => handleChange("bio", e.target.value)}
                                            rows={4}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                                            placeholder="Brief professional summary..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Contact Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-purple-500 outline-none"
                                            placeholder="you@example.com"
                                        />
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                {/* Experience */}
                                <section className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Experience</h3>
                                        <button onClick={addExperience} className="text-sm text-purple-600 font-semibold hover:text-purple-700">
                                            + Add Position
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {formData.experience.map((exp, index) => (
                                            <div key={index} className="p-4 bg-slate-50 rounded-xl relative group border border-slate-100">
                                                <button
                                                    onClick={() => removeExperience(index)}
                                                    className="absolute top-2 right-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    🗑️
                                                </button>

                                                <div className="grid grid-cols-2 gap-3 mb-3">
                                                    <input
                                                        value={exp.role}
                                                        onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
                                                        className="px-3 py-1.5 bg-white rounded border border-slate-200 text-sm font-medium"
                                                        placeholder="Role"
                                                    />
                                                    <input
                                                        value={exp.company}
                                                        onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                                                        className="px-3 py-1.5 bg-white rounded border border-slate-200 text-sm"
                                                        placeholder="Company"
                                                    />
                                                </div>
                                                <input
                                                    value={exp.duration}
                                                    onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
                                                    className="w-full px-3 py-1.5 bg-white rounded border border-slate-200 text-sm mb-3"
                                                    placeholder="Jan 2020 - Present"
                                                />
                                                {/* Description handled as simple text for now, could be improved */}
                                                <textarea
                                                    value={Array.isArray(exp.description) ? exp.description.join("\n") : exp.description}
                                                    onChange={(e) => handleExperienceChange(index, "description", e.target.value.split("\n"))}
                                                    rows={3}
                                                    className="w-full px-3 py-1.5 bg-white rounded border border-slate-200 text-xs"
                                                    placeholder="• Achievements..."
                                                />
                                            </div>
                                        ))}

                                        {formData.experience.length === 0 && (
                                            <p className="text-center text-slate-400 text-sm py-4 italic">
                                                No experience added yet.
                                            </p>
                                        )}
                                    </div>
                                </section>
                            </div>

                            <div className="sticky bottom-0 bg-white pt-4 pb-8 border-t mt-8 flex gap-3">
                                <button
                                    onClick={handleSave}
                                    className="flex-1 px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-95"
                                >
                                    💾 Save URL
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="flex-1 px-4 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all shadow-lg shadow-purple-200 hover:shadow-xl active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <span>🔗</span> Share
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
