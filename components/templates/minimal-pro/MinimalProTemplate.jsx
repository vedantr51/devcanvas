/**
 * Minimal Pro Template
 * Clean, editorial design with generous whitespace
 * Single-column layout with focus on typography
 */

import Link from "next/link";
import { hasExperience, hasEducation, hasSkills, hasContact } from "@/lib/portfolioModel";

export function MinimalProTemplate({ data, projects }) {
    if (!data) return null;

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[#1d1d1d] text-white font-sans selection:bg-white selection:text-black">
            {/* Left Content Section */}
            <div className="flex-1 lg:max-w-[50%] px-8 lg:px-24 py-16 overflow-y-auto">
                {/* Header/Name */}
                <header className="mb-20">
                    <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-4 leading-tight !text-white" style={{ color: 'white' }}>
                        {data.name.toUpperCase()}
                        <span className="!text-gray-300 block text-2xl lg:text-3xl font-normal mt-2 tracking-normal" style={{ color: '#d1d5db' }}>
                            {data.title}
                        </span>
                    </h1>
                    <div className="w-20 h-1 bg-white mt-8" />
                </header>

                {/* About */}
                <section className="mb-20">
                    <p className="!text-gray-200 text-lg leading-relaxed max-w-xl" style={{ color: '#e5e7eb' }}>
                        {data.summary}
                    </p>
                </section>

                {/* Experience */}
                {hasExperience(data) && (
                    <section className="mb-20">
                        <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 !text-white" style={{ color: 'white' }}>
                            <span className="w-8 h-[1px] bg-gray-500" />
                            EXPERIENCE
                        </h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="group hover:translate-x-2 transition-transform duration-300">
                                    <div className="flex justify-between items-baseline mb-2">
                                        <h3 className="text-xl font-bold !text-white" style={{ color: 'white' }}>{exp.role}</h3>
                                        <span className="text-sm !text-gray-400 font-mono" style={{ color: '#9ca3af' }}>{exp.duration}</span>
                                    </div>
                                    <h4 className="!text-gray-300 mb-4" style={{ color: '#d1d5db' }}>{exp.company}</h4>
                                    {exp.description && (
                                        <ul className="!text-gray-400 text-sm space-y-2" style={{ color: '#9ca3af' }}>
                                            {exp.description.slice(0, 2).map((desc, i) => (
                                                <li key={i}>• {desc}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                <section className="mb-20">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 !text-white" style={{ color: 'white' }}>
                        <span className="w-8 h-[1px] bg-gray-500" />
                        PROJECTS
                    </h2>
                    <div className="grid grid-cols-1 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="block bg-[#252525] p-6 hover:bg-[#303030] transition-colors border-l-2 border-transparent hover:border-white"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold !text-white" style={{ color: 'white' }}>{project.name}</h3>
                                    {project.language && (
                                        <span className="text-xs font-mono !text-gray-400 border border-gray-600 px-2 py-1" style={{ color: '#9ca3af' }}>
                                            {project.language}
                                        </span>
                                    )}
                                </div>
                                <p className="!text-gray-400 text-sm mb-6 line-clamp-2" style={{ color: '#9ca3af' }}>
                                    {project.description}
                                </p>
                                <div className="flex gap-4">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-bold tracking-widest uppercase border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors text-white"
                                        style={{ color: 'white' }}
                                    >
                                        View Code
                                    </a>
                                    {project.homepage && (
                                        <a
                                            href={project.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold tracking-widest uppercase border-b border-white/20 pb-1 hover:text-white hover:border-white transition-colors text-white"
                                            style={{ color: 'white' }}
                                        >
                                            Visit Site
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer/Contact */}
                <footer className="pt-8 border-t border-gray-800 flex gap-6 text-sm text-gray-400 font-mono">
                    {data.contact.email && (
                        <a href={`mailto:${data.contact.email}`} className="hover:text-white transition-colors">EMAIL</a>
                    )}
                    <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GITHUB</a>
                    {data.contact.linkedin && (
                        <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LINKEDIN</a>
                    )}
                </footer>
            </div>

            {/* Right Image Section (Fixed on Desktop) */}
            <div className="hidden lg:block lg:w-[50%] fixed right-0 top-0 bottom-0 bg-[#161616]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d1d1d] to-transparent z-10" />
                <img
                    src={data.avatarUrl}
                    alt={data.name}
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                />
            </div>
        </div>
    );
}
