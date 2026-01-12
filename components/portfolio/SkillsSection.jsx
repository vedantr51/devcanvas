export function SkillsSection({ skills }) {
    if (!skills || skills.length === 0) return null;

    const colors = [
        { bg: "from-[#6366f1] to-[#8b5cf6]", light: "#eef2ff" },
        { bg: "from-[#10b981] to-[#14b8a6]", light: "#ecfdf5" },
        { bg: "from-[#f59e0b] to-[#f97316]", light: "#fffbeb" },
        { bg: "from-[#ec4899] to-[#f43f5e]", light: "#fdf2f8" },
        { bg: "from-[#3b82f6] to-[#0ea5e9]", light: "#eff6ff" },
        { bg: "from-[#8b5cf6] to-[#a855f7]", light: "#faf5ff" },
    ];

    return (
        <section className="py-16 px-6 md:px-12 bg-[#f8fafc]">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#eef2ff] text-[#6366f1] text-sm font-medium rounded-full mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        Tech Stack
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
                        Expertise & Technologies
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="flex flex-wrap justify-center gap-4">
                    {skills.map((skill, index) => {
                        const color = colors[index % colors.length];
                        return (
                            <div
                                key={skill.name}
                                className="group relative"
                            >
                                <div
                                    className="px-6 py-3 rounded-2xl font-semibold text-[#0f172a] border-2 border-[#e2e8f0] bg-white shadow-sm hover:shadow-lg hover:border-[#6366f1] transition-all duration-300 cursor-default"
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            className={`w-3 h-3 rounded-full bg-gradient-to-r ${color.bg}`}
                                        />
                                        {skill.name}
                                        <span className="text-[#94a3b8] text-sm font-normal">
                                            {skill.percentage}%
                                        </span>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
