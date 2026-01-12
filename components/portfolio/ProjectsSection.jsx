export function ProjectsSection({ repos }) {
    if (!repos || repos.length === 0) return null;

    const [featured, ...rest] = repos;

    const langColors = {
        JavaScript: { bg: "#fffbeb", text: "#d97706", dot: "#f59e0b" },
        TypeScript: { bg: "#eff6ff", text: "#2563eb", dot: "#3b82f6" },
        Python: { bg: "#ecfdf5", text: "#059669", dot: "#10b981" },
        Java: { bg: "#fef2f2", text: "#dc2626", dot: "#ef4444" },
        Go: { bg: "#ecfeff", text: "#0891b2", dot: "#06b6d4" },
        Rust: { bg: "#fff7ed", text: "#ea580c", dot: "#f97316" },
        Ruby: { bg: "#fef2f2", text: "#dc2626", dot: "#ef4444" },
        PHP: { bg: "#faf5ff", text: "#9333ea", dot: "#a855f7" },
        CSS: { bg: "#fdf2f8", text: "#db2777", dot: "#ec4899" },
        HTML: { bg: "#fff7ed", text: "#ea580c", dot: "#f97316" },
        default: { bg: "#f1f5f9", text: "#475569", dot: "#64748b" },
    };

    const getColor = (lang) => langColors[lang] || langColors.default;

    return (
        <section className="py-20 px-6 md:px-12 bg-white">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#ecfdf5] text-[#059669] text-sm font-medium rounded-full mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Portfolio
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
                        Featured Projects
                    </h2>
                </div>

                {/* Featured Project */}
                {featured && (
                    <div className="mb-10">
                        <div className="relative group bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-3xl p-1 shadow-xl shadow-indigo-500/20">
                            <div className="bg-white rounded-[22px] p-8">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Left - Icon */}
                                    <div className="flex-shrink-0">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                            {featured.name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>

                                    {/* Right - Content */}
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <span className="inline-block px-2 py-0.5 bg-[#fffbeb] text-[#d97706] text-xs font-semibold rounded mb-2">
                                                    ⭐ Featured
                                                </span>
                                                <h3 className="text-2xl font-bold text-[#0f172a]">
                                                    {featured.name}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-1 px-3 py-1.5 bg-[#fffbeb] rounded-full">
                                                <svg className="w-4 h-4 text-[#f59e0b]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm font-bold text-[#d97706]">{featured.stars}</span>
                                            </div>
                                        </div>

                                        <p className="text-[#475569] mb-4 text-lg">
                                            {featured.description || "A project showcasing modern development practices and clean architecture."}
                                        </p>

                                        {/* Tech */}
                                        <div className="flex flex-wrap gap-2 mb-5">
                                            {featured.language && (
                                                <span
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm font-medium"
                                                    style={{
                                                        backgroundColor: getColor(featured.language).bg,
                                                        color: getColor(featured.language).text
                                                    }}
                                                >
                                                    <span
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: getColor(featured.language).dot }}
                                                    />
                                                    {featured.language}
                                                </span>
                                            )}
                                            {featured.topics?.slice(0, 3).map((topic) => (
                                                <span key={topic} className="px-3 py-1 bg-[#f1f5f9] text-[#475569] rounded-lg text-sm font-medium">
                                                    {topic}
                                                </span>
                                            ))}
                                        </div>

                                        {/* CTAs */}
                                        <div className="flex items-center gap-4">
                                            <a
                                                href={featured.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl font-medium hover:from-[#4f46e5] hover:to-[#7c3aed] transition-all shadow-lg shadow-indigo-500/25"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                                View Repository
                                            </a>
                                            {featured.homepage && (
                                                <a
                                                    href={featured.homepage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-[#e2e8f0] text-[#475569] rounded-xl font-medium hover:border-[#6366f1] hover:text-[#6366f1] transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Rest of Projects Grid */}
                {rest.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {rest.map((repo) => (
                            <div
                                key={repo.id}
                                className="group bg-white rounded-2xl p-6 border-2 border-[#e2e8f0] hover:border-[#6366f1] hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 flex items-center justify-center text-[#6366f1] text-lg font-bold group-hover:from-[#6366f1] group-hover:to-[#8b5cf6] group-hover:text-white transition-all duration-300">
                                            {repo.name.charAt(0).toUpperCase()}
                                        </div>
                                        <h3 className="text-lg font-bold text-[#0f172a]">{repo.name}</h3>
                                    </div>
                                    <div className="flex items-center gap-1 text-[#f59e0b]">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm font-semibold">{repo.stars}</span>
                                    </div>
                                </div>

                                <p className="text-[#475569] mb-4 line-clamp-2">
                                    {repo.description || "An innovative project demonstrating practical solutions."}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {repo.language && (
                                        <span
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
                                            style={{
                                                backgroundColor: getColor(repo.language).bg,
                                                color: getColor(repo.language).text
                                            }}
                                        >
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: getColor(repo.language).dot }}
                                            />
                                            {repo.language}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-[#e2e8f0]">
                                    <a
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-medium text-[#6366f1] hover:text-[#4f46e5] transition-colors"
                                    >
                                        View Code →
                                    </a>
                                    {repo.homepage && (
                                        <a
                                            href={repo.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-medium text-[#10b981] hover:text-[#059669] transition-colors"
                                        >
                                            Live Demo →
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
