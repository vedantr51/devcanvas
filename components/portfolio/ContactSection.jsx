import { hasContactInfo } from "@/lib/normalize";

export function ContactSection({ user }) {
    if (!user || !hasContactInfo(user)) return null;

    return (
        <section className="py-20 px-6 md:px-12 bg-[#f8fafc]">
            <div className="max-w-5xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#fffbeb] text-[#d97706] text-sm font-medium rounded-full mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a] mb-3">
                        Let's Connect
                    </h2>
                    <p className="text-[#475569] max-w-md mx-auto">
                        Interested in collaborating or just want to say hi? Reach out!
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="flex flex-wrap justify-center gap-4">
                    {user.email && (
                        <a
                            href={`mailto:${user.email}`}
                            className="group flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border-2 border-[#e2e8f0] hover:border-[#6366f1] hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-[#94a3b8]">Email</div>
                                <div className="font-semibold text-[#0f172a]">{user.email}</div>
                            </div>
                        </a>
                    )}

                    {user.blog && (
                        <a
                            href={user.blog.startsWith("http") ? user.blog : `https://${user.blog}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border-2 border-[#e2e8f0] hover:border-[#10b981] hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#14b8a6] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-[#94a3b8]">Website</div>
                                <div className="font-semibold text-[#0f172a]">Visit site</div>
                            </div>
                        </a>
                    )}

                    {user.twitterUsername && (
                        <a
                            href={`https://twitter.com/${user.twitterUsername}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border-2 border-[#e2e8f0] hover:border-[#0ea5e9] hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0ea5e9] to-[#38bdf8] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </div>
                            <div className="text-left">
                                <div className="text-sm text-[#94a3b8]">Twitter</div>
                                <div className="font-semibold text-[#0f172a]">@{user.twitterUsername}</div>
                            </div>
                        </a>
                    )}

                    <a
                        href={`https://github.com/${user.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 px-6 py-4 bg-white rounded-2xl border-2 border-[#e2e8f0] hover:border-[#0f172a] hover:shadow-xl transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-[#0f172a] flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="text-left">
                            <div className="text-sm text-[#94a3b8]">GitHub</div>
                            <div className="font-semibold text-[#0f172a]">@{user.username}</div>
                        </div>
                    </a>
                </div>
            </div>
        </section>
    );
}
