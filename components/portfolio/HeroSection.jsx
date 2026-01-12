import { formatJoinDate } from "@/lib/normalize";

export function HeroSection({ user, skills = [], repos = [] }) {
    if (!user) return null;

    // Calculate portfolio-relevant stats
    const totalStars = repos.reduce((sum, repo) => sum + (repo.stars || 0), 0);
    const primaryStack = skills.length > 0 ? skills[0].name : "Developer";
    const joinYear = new Date(user.createdAt).getFullYear();
    const currentYear = new Date().getFullYear();
    const yearsActive = currentYear - joinYear || 1;

    return (
        <section className="relative overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7]" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />

            <div className="relative px-6 md:px-12 py-20 md:py-28">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Avatar - Prominent with frame */}
                        <div className="relative flex-shrink-0">
                            <div className="absolute -inset-3 bg-white/20 rounded-3xl blur-xl" />
                            <img
                                src={user.avatarUrl}
                                alt={user.name}
                                className="relative w-36 h-36 md:w-44 md:h-44 rounded-2xl ring-4 ring-white/30 shadow-2xl"
                            />
                        </div>

                        {/* Content */}
                        <div className="text-center md:text-left">
                            {/* Name */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-lg">
                                {user.name}
                            </h1>

                            {/* Username */}
                            <a
                                href={`https://github.com/${user.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 hover:bg-white/20 transition-colors mb-5"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                @{user.username}
                            </a>

                            {/* Bio */}
                            {user.bio && (
                                <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                                    {user.bio}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="relative px-6 md:px-12 pb-8 pt-12">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Projects */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-500/10 border border-[#e2e8f0]">
                            <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center mb-3">
                                <svg className="w-5 h-5 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-[#0f172a]">{user.publicRepos}</div>
                            <div className="text-sm text-[#94a3b8]">Projects</div>
                        </div>

                        {/* Primary Stack */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-500/10 border border-[#e2e8f0]">
                            <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] flex items-center justify-center mb-3">
                                <svg className="w-5 h-5 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                            <div className="text-lg font-bold text-[#0f172a] truncate">{primaryStack}</div>
                            <div className="text-sm text-[#94a3b8]">Primary Stack</div>
                        </div>

                        {/* Years Active */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-500/10 border border-[#e2e8f0]">
                            <div className="w-10 h-10 rounded-xl bg-[#fffbeb] flex items-center justify-center mb-3">
                                <svg className="w-5 h-5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-[#0f172a]">{yearsActive}+</div>
                            <div className="text-sm text-[#94a3b8]">Years Active</div>
                        </div>

                        {/* Featured Projects */}
                        <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-500/10 border border-[#e2e8f0]">
                            <div className="w-10 h-10 rounded-xl bg-[#fef2f2] flex items-center justify-center mb-3">
                                <svg className="w-5 h-5 text-[#ef4444]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div className="text-2xl font-bold text-[#0f172a]">{repos.length}</div>
                            <div className="text-sm text-[#94a3b8]">Curated Projects</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
