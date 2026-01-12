/**
 * Modern Dev Template
 * Card-based layout with tech badges and hover interactions
 * Default template for developer portfolios
 */

import Link from "next/link";
import {
    SectionWrapper,
    SectionTitle,
    ProjectCard,
    SkillBadge,
    ExperienceItem,
    EducationItem,
    ContactLink
} from "../shared";
import { hasExperience, hasEducation, hasSkills, hasContact } from "@/lib/portfolioModel";

export function ModernDevTemplate({ data, projects }) {
    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#11071f] text-white selection:bg-purple-500 selection:text-white pb-20">
            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-900/30 rounded-full blur-[120px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                    {data.name}
                </div>
                <div className="flex gap-4">
                    <a
                        href={`https://github.com/${data.username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 transition-all font-medium text-sm"
                    >
                        GitHub
                    </a>
                </div>
            </nav>

            {/* Hero */}
            <header className="relative z-10 pt-20 pb-32 px-6 text-center max-w-4xl mx-auto">
                <div className="mb-8 inline-block p-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                    <img
                        src={data.avatarUrl}
                        alt={data.name}
                        className="w-32 h-32 rounded-full border-4 border-[#11071f]"
                    />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 !text-white" style={{ color: 'white' }}>
                    Building the <br /> <span className="text-purple-400">Digital Future.</span>
                </h1>
                <p className="text-xl !text-gray-300 max-w-2xl mx-auto mb-10" style={{ color: '#d1d5db' }}>
                    {data.summary || `I'm a ${data.title} passionate about creating interactive applications and experiences on the web.`}
                </p>
            </header>

            {/* Projects Grid */}
            <section className="relative z-10 px-6 max-w-7xl mx-auto pb-32">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold !text-white" style={{ color: 'white' }}>Latest Projects</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative h-full bg-[#1a102a] border border-white/5 rounded-3xl p-6 hover:shadow-2xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 flex flex-col"
                        >
                            <div className="absolute top-6 right-6 p-2 rounded-full bg-white/5 text-white/40 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </div>

                            <div className="mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-xl font-bold mb-4 text-white">
                                    {project.name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="text-xl font-bold mb-2 !text-white group-hover:!text-purple-400 transition-colors" style={{ color: 'white' }}>
                                    {project.name}
                                </h3>
                                <p className="!text-gray-300 text-sm leading-relaxed line-clamp-3" style={{ color: '#d1d5db' }}>
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.language && (
                                    <span className="px-2 py-1 bg-white/10 rounded-md text-xs !text-gray-200 border border-white/10" style={{ color: '#e5e7eb' }}>
                                        {project.language}
                                    </span>
                                )}
                                <span className="px-2 py-1 bg-white/10 rounded-md text-xs !text-gray-200 border border-white/10 flex items-center gap-1" style={{ color: '#e5e7eb' }}>
                                    ★ {project.stars}
                                </span>
                            </div>

                            <div className="mt-auto flex gap-3">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-2 text-center rounded-xl bg-white/5 hover:bg-white/10 !text-white text-sm font-medium transition-colors"
                                    style={{ color: 'white' }}
                                >
                                    Code
                                </a>
                                {project.homepage && (
                                    <a
                                        href={project.homepage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 py-2 text-center rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm font-medium transition-colors border border-purple-500/20"
                                    >
                                        Live Demo
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Skills Section */}
            {hasSkills(data) && (
                <div className="relative z-10 px-6 max-w-4xl mx-auto mb-32">
                    <h2 className="text-3xl font-bold mb-12 text-center !text-white" style={{ color: 'white' }}>Technologies</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {data.skills.map((skill, idx) => (
                            <div key={idx} className="px-4 py-3 rounded-2xl bg-[#1a102a] border border-white/5 hover:border-purple-500/30 transition-colors">
                                <span className={skill.usedInProjects ? "text-purple-300 font-medium" : "text-gray-400"}>
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Experience & Education Grid */}
            <div className="relative z-10 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-32">
                {/* Experience */}
                {hasExperience(data) && (
                    <div>
                        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 !text-white" style={{ color: 'white' }}>
                            <span className="w-8 h-1 bg-purple-500 rounded-full" /> Experience
                        </h2>
                        <div className="space-y-8">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="relative pl-8 border-l border-white/10">
                                    <div className="absolute left-0 top-1.5 w-3 h-3 -translate-x-[6.5px] rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                                    <h3 className="text-xl font-bold !text-white mb-1" style={{ color: 'white' }}>{exp.role}</h3>
                                    <div className="flex justify-between items-center text-sm mb-4">
                                        <span className="text-purple-400 font-medium">{exp.company}</span>
                                        <span className="!text-gray-500" style={{ color: '#9ca3af' }}>{exp.duration}</span>
                                    </div>
                                    <ul className="space-y-2 text-gray-400 text-sm">
                                        {exp.description?.slice(0, 3).map((desc, i) => (
                                            <li key={i} className="!text-gray-400" style={{ color: '#9ca3af' }}>• {desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {hasEducation(data) && (
                    <div>
                        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3 !text-white" style={{ color: 'white' }}>
                            <span className="w-8 h-1 bg-pink-500 rounded-full" /> Education
                        </h2>
                        <div className="space-y-8">
                            {data.education.map((edu, idx) => (
                                <div key={idx} className="bg-[#1a102a] p-6 rounded-3xl border border-white/5">
                                    <h3 className="text-lg font-bold !text-white mb-2" style={{ color: 'white' }}>{edu.degree}</h3>
                                    <div className="text-pink-400 font-medium mb-1">{edu.institution}</div>
                                    <div className="!text-gray-500 text-sm" style={{ color: '#9ca3af' }}>{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Contact */}
            <footer id="contact" className="relative z-10 px-6 max-w-4xl mx-auto text-center">
                <div className="p-1 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500">
                    <div className="bg-[#0f0518] rounded-[22px] px-8 py-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 !text-white" style={{ color: 'white' }}>Let's work together</h2>
                        <div className="flex flex-wrap justify-center gap-6 mt-8">
                            {data.contact.email && (
                                <a href={`mailto:${data.contact.email}`} className="px-8 py-4 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform">
                                    Email Me
                                </a>
                            )}
                            <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors">
                                GitHub
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-gray-500 text-sm">
                    © {new Date().getFullYear()} {data.name}. Generated with DevCanvas.
                </div>
            </footer>
        </div>
    );
}

function StatCard({ icon, value, label, color, isText = false }) {
    const colors = {
        indigo: { bg: "bg-[#eef2ff]", text: "text-[#6366f1]" },
        emerald: { bg: "bg-[#ecfdf5]", text: "text-[#10b981]" },
        amber: { bg: "bg-[#fffbeb]", text: "text-[#f59e0b]" },
        rose: { bg: "bg-[#fef2f2]", text: "text-[#ef4444]" },
    };

    const { bg, text } = colors[color];

    return (
        <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-500/10 border border-[#e2e8f0]">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <span className={text}>{icon}</span>
            </div>
            <div className={`${isText ? "text-lg" : "text-2xl"} font-bold text-[#0f172a] ${isText ? "truncate" : ""}`}>
                {value}
            </div>
            <div className="text-sm text-[#94a3b8]">{label}</div>
        </div>
    );
}

function FolderIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    );
}

function CodeIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}
