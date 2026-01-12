/**
 * Resume+ Template
 * Traditional resume format with portfolio integration
 * Recruiter-friendly, document-style layout
 */

import Link from "next/link";
import { hasExperience, hasEducation, hasSkills, hasContact } from "@/lib/portfolioModel";

export function ResumePlusTemplate({ data, projects }) {
    if (!data) return null;

    return (
        <div className="min-h-screen bg-[#f8f9fa] flex flex-col md:flex-row font-sans">
            {/* Sidebar */}
            <aside className="w-full md:w-80 bg-white border-r border-gray-200 flex-shrink-0">
                <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-10">
                        <div className="w-32 h-32 mx-auto rounded-full p-1 bg-yellow-400 mb-4">
                            <img
                                src={data.avatarUrl}
                                alt={data.name}
                                className="w-full h-full rounded-full object-cover border-4 border-white"
                            />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">{data.name}</h1>
                        <p className="text-sm bg-yellow-100 text-yellow-800 py-1 px-3 rounded-full inline-block font-medium">
                            {data.title || "Developer"}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4 mb-10">
                        {data.contact.email && (
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="truncate">{data.contact.email}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </div>
                            <span className="truncate">github.com/{data.username}</span>
                        </div>
                        {data.contact.linkedin && (
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </div>
                                <span className="truncate">LinkedIn</span>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="mb-10">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">SKILLS</h3>
                        <div className="flex flex-wrap gap-2">
                            {data.skills.map((skill, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                                    {skill.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Education */}
                    {hasEducation(data) && (
                        <div>
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">EDUCATION</h3>
                            <div className="space-y-4">
                                {data.education.map((edu, idx) => (
                                    <div key={idx}>
                                        <div className="font-bold text-gray-800 text-sm">{edu.degree}</div>
                                        <div className="text-xs text-gray-500">{edu.institution}</div>
                                        {edu.year && <div className="text-xs text-gray-400">{edu.year}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 md:p-12 lg:p-16 overflow-y-auto">
                {/* Summary */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-yellow-400 pl-4">Profile</h2>
                    <p className="text-gray-600 leading-7 text-lg">
                        {data.summary}
                    </p>
                </section>

                {/* Experience */}
                {hasExperience(data) && (
                    <section className="mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-yellow-400 pl-4">Experience</h2>
                        <div className="space-y-10">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="relative">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                                        <span className="text-sm font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full inline-block mt-2 sm:mt-0">
                                            {exp.duration}
                                        </span>
                                    </div>
                                    <div className="text-lg text-gray-500 font-medium mb-4">{exp.company}</div>
                                    <ul className="space-y-2 text-gray-600 list-disc list-outside ml-4">
                                        {exp.description?.map((desc, i) => (
                                            <li key={i} className="pl-1">{desc}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-4 border-yellow-400 pl-4">Projects</h2>
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="bg-white border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-all hover:-translate-y-1 group flex flex-col"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                        {project.name}
                                    </h3>
                                    <span className="text-xs bg-gray-900 text-white px-2 py-1 rounded">
                                        GitHub
                                    </span>
                                </div>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2 min-h-[40px] flex-1">
                                    {project.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
                                        {project.language && <span>{project.language}</span>}
                                        <span>★ {project.stars}</span>
                                    </div>
                                    <div className="flex gap-3 text-sm font-medium">
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-yellow-600">
                                            Code
                                        </a>
                                        {project.homepage && (
                                            <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:text-yellow-700">
                                                Live Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}

function SectionHeader({ children, small = false }) {
    return (
        <h2 className={`font-bold text-[#0f172a] border-b border-[#e2e8f0] pb-2 mb-4 ${small ? "text-sm" : "text-lg"}`}>
            {children}
        </h2>
    );
}

function EmailIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    );
}

function LinkedInIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
    );
}
