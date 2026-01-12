"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function GitHubDefaultTemplate({ data, projects }) {
    if (!data) return null;

    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">

            {/* Animated Navbar */}
            {/* Animated Navbar */}
            <motion.nav
                initial={false}
                animate={{
                    width: "100%",
                    maxWidth: isScrolled ? "600px" : "100%",
                    y: isScrolled ? 20 : 0,
                    borderRadius: isScrolled ? "9999px" : "0px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(12px)",
                    boxShadow: isScrolled ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)" : "none",
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed left-0 right-0 z-50 mx-auto overflow-hidden flex items-center justify-between px-6 py-3 transition-all duration-300`}
            >
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm transition-colors duration-300">
                        {(data.name || data.username).charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold tracking-tight text-gray-900 transition-colors duration-300">{data.name || data.username}</span>

                </div>
                <a
                    href={`https://github.com/${data.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 group transition-all duration-300 bg-gray-900 text-white hover:bg-purple-600 shadow-md hover:shadow-lg"
                >
                    <span>View GitHub</span>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                </a>
            </motion.nav>

            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-[#8b5cf6] to-[#a855f7] pt-32 pb-32 px-6 text-center overflow-hidden">
                {/* Abstract Shapes */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-900 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
                    {/* Profile Section */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl w-full">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-500" />
                            <div className="relative w-40 h-40 rounded-2xl p-1 bg-gradient-to-br from-white/80 to-white/40 shadow-2xl shrink-0 backdrop-blur-sm">
                                <img
                                    src={data.avatarUrl}
                                    alt={data.name}
                                    className="w-full h-full rounded-xl object-cover shadow-inner bg-white"
                                />
                            </div>
                        </div>

                        <div className="text-center md:text-left">
                            <div className="group relative flex items-center justify-center md:justify-start gap-3">
                                <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-3 text-white drop-shadow-md tracking-tight">
                                    {data.name || data.username}
                                </h1>
                            </div>
                            <a
                                href={`https://github.com/${data.username}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-purple-100 hover:text-white transition-colors bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/20"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">@{data.username}</span>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

            {/* Stats Grid - Positioned Overlapping */}
            <div className="relative z-20 max-w-4xl mx-auto px-6 -mt-24 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <StatCard
                        icon={<FolderIcon />}
                        value={data.publicRepos}
                        label="Repositories"
                        color="indigo"
                    />
                    <StatCard
                        icon={<UsersIcon />}
                        value={projects[0]?.stars || 0}
                        label="Followers"
                        color="emerald"
                    />
                    <StatCard
                        icon={<UserGroupIcon />}
                        value={data.education?.length || 0}
                        label="Following"
                        color="amber"
                    />
                    <StatCard
                        icon={<CalendarIcon />}
                        value={new Date(data.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
                        label="Member since"
                        color="rose"
                        isText
                    />
                </div>
            </div>

            {/* Tech Stack */}
            <div className="max-w-4xl mx-auto px-6 pt-12 pb-20 text-center">
                <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold tracking-wider uppercase mb-6">
                    Tech Stack
                </div>
                <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12">Expertise & Technologies</h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {data.skills && data.skills.length > 0 ? (
                        data.skills.map((skill, idx) => (
                            <SkillPill key={idx} name={skill.name} percent={Math.floor(Math.random() * (90 - 60 + 1) + 60)} />
                        ))
                    ) : (
                        // Fallback if no skills are parsed/found
                        ["JavaScript", "React", "Node.js", "CSS", "HTML", "Git"].map((s, i) => (
                            <SkillPill key={i} name={s} percent={80} />
                        ))
                    )}
                </div>
            </div>

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
                <div className="max-w-4xl mx-auto px-6 pb-20">
                    <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 mx-auto block w-fit">
                        Experience
                    </div>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-12 text-center">Professional Journey</h2>

                    <div className="max-w-3xl mx-auto space-y-12">
                        {data.experience.map((exp, idx) => (
                            <div key={idx} className="relative pl-8 border-l-2 border-purple-100 hover:border-purple-300 transition-colors">
                                <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-white bg-purple-600 shadow-sm"></div>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                                    <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 px-3 py-1 rounded-full w-fit">{exp.duration}</span>
                                </div>
                                <div className="text-purple-600 font-medium mb-4">{exp.company}</div>

                                {Array.isArray(exp.description) ? (
                                    <ul className="list-disc list-outside ml-4 space-y-2 text-gray-600 leading-relaxed">
                                        {exp.description.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Projects */}
            <div className="bg-gray-50 py-24 px-6 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-serif font-bold text-center mb-16">Selected Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                                        <FolderIcon />
                                    </div>
                                    <span className="text-sm font-medium text-gray-400 no-underline">
                                        {project.stars} ★
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{project.name}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {project.description}
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <a href={project.url} className="text-sm font-semibold text-purple-600 hover:text-purple-700">View Code →</a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <footer className="bg-white py-12 text-center text-gray-400 text-sm border-t border-gray-100">
                <p>© {new Date().getFullYear()} {data.username}. Built with DevCanvas.</p>
            </footer>
        </div>
    );
}

function StatCard({ icon, value, label, color, isText = false }) {
    const colors = {
        indigo: { bg: "bg-white text-purple-600", text: "text-gray-900" },
        emerald: { bg: "bg-white text-green-600", text: "text-gray-900" },
        amber: { bg: "bg-white text-yellow-600", text: "text-gray-900" },
        rose: { bg: "bg-white text-pink-600", text: "text-gray-900" },
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-6 rounded-2xl shadow-xl shadow-purple-900/5 flex flex-col items-start gap-4 text-left"
        >
            <div className={`p-3 rounded-xl bg-purple-50 text-purple-600`}>
                {icon}
            </div>
            <div>
                <div className={`font-bold text-gray-900 ${isText ? "text-sm" : "text-3xl"}`}>{value}</div>
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mt-1">{label}</div>
            </div>
        </motion.div>
    );
}

function SkillPill({ name, percent }) {
    const colors = ["bg-purple-500", "bg-indigo-500", "bg-pink-500", "bg-blue-500"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return (
        <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 min-w-[180px]">
            <span className={`w-3 h-3 rounded-full ${color}`} />
            <span className="font-bold text-gray-700">{name}</span>
            <span className="ml-auto text-xs text-gray-400 font-mono">{percent}%</span>
        </div>
    )
}

function FolderIcon() {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>;
}
function UsersIcon() {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>;
}
function UserGroupIcon() {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
}
function CalendarIcon() {
    return <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
}
