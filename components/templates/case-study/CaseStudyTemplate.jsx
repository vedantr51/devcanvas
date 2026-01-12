"use client";

import { motion } from "framer-motion";

export function CaseStudyTemplate({ data, projects }) {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Minimal Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <span className="font-bold text-xl tracking-tight">{data.name}</span>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
                        <a href="#work" className="hover:text-black transition-colors">Work</a>
                        {data.experience?.length > 0 && <a href="#experience" className="hover:text-black transition-colors">Experience</a>}
                        <a href="#about" className="hover:text-black transition-colors">About</a>
                        <a href="#contact" className="hover:text-black transition-colors">Contact</a>
                    </nav>
                </div>
            </header>

            <main className="pt-32 pb-20 max-w-6xl mx-auto px-6">
                {/* Intro */}
                <section id="about" className="mb-32 max-w-3xl scroll-mt-32">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-normal leading-tight mb-8 text-gray-900"
                    >
                        {data.title} focused on creating <span className="text-blue-600">meaningful experiences</span>.
                    </motion.h1>
                    <p className="text-xl text-gray-500 leading-relaxed max-w-2xl">
                        {data.summary}
                    </p>
                </section>

                {/* Case Studies */}
                <section id="work" className="space-y-32 scroll-mt-32">
                    {projects.map((project, index) => (
                        <div key={project.id} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className={`aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 ${index % 2 === 1 ? 'md:order-2' : ''}`}
                            >
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white group-hover:scale-105 transition-transform duration-500">
                                    {/* Placeholder for project image */}
                                    <div className="text-center p-8">
                                        <div className="w-16 h-16 bg-blue-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-blue-600">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                                <span className="text-blue-600 font-medium text-sm mb-4 block">CASE STUDY 0{index + 1}</span>
                                <h3 className="text-3xl font-bold mb-4">{project.name}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.topics?.map(topic => (
                                        <span key={topic} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center text-gray-900 font-semibold hover:text-blue-600 transition-colors"
                                    >
                                        Read Case Study
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </a>
                                    {project.homepage && (
                                        <a
                                            href={project.homepage}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                        >
                                            Visit Live Site
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Experience */}
                {data.experience && data.experience.length > 0 && (
                    <section id="experience" className="mb-32 scroll-mt-32">
                        <h2 className="text-3xl font-bold mb-12 border-b border-gray-100 pb-6">Experience</h2>
                        <div className="space-y-12">
                            {data.experience.map((exp, idx) => (
                                <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <div className="text-gray-400 font-medium text-sm md:col-span-1">
                                        {exp.duration}
                                    </div>
                                    <div className="md:col-span-3">
                                        <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                                        <div className="text-blue-600 mb-4 font-medium">{exp.company}</div>
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
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                <section id="contact" className="mt-32 pt-20 border-t border-gray-100 text-center scroll-mt-32">
                    <h2 className="text-3xl font-bold mb-6">Ready to create something together?</h2>
                    <div className="flex justify-center gap-6">
                        {data.contact.email && (
                            <a href={`mailto:${data.contact.email}`} className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                Say Hello
                            </a>
                        )}
                        <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
                            GitHub
                        </a>
                        {data.contact.linkedin && (
                            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-lg font-medium text-gray-600 hover:text-blue-600 transition-colors">
                                LinkedIn
                            </a>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
