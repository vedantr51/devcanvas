"use client";

import { motion } from "framer-motion";

export function CreativeShowcaseTemplate({ data, projects }) {
    const { name, title, summary, social } = data;

    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-green-500 selection:text-black">
            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center px-6 lg:px-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl z-10"
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
                        <span className="block text-green-500">HI, I'M {name.split(' ')[0].toUpperCase()}</span>
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                            {name.split(' ').slice(1).join(' ').toUpperCase()}
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
                        {title} — {summary}
                    </p>

                    <div className="flex gap-4">
                        <a href="#projects" className="px-8 py-4 bg-green-500 text-black font-bold text-lg rounded-full hover:scale-105 transition-transform inline-block text-center">
                            VIEW PROJECTS
                        </a>
                        <a href="#contact" className="px-8 py-4 border border-gray-700 text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-colors inline-block text-center">
                            CONTACT ME
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Projects Grid */}
            <section id="projects" className="py-20 px-6 lg:px-20 bg-[#050505]">
                <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
                    <span className="w-12 h-1 bg-green-500" />
                    SELECTED WORKS
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-colors flex flex-col"
                        >
                            <div className="p-8 flex-1 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-green-400 transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-400 line-clamp-2 mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.topics?.slice(0, 3).map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded-md border border-green-500/20">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white uppercase tracking-wider border-b border-green-500 pb-1 hover:text-green-400">
                                            View Code
                                        </a>
                                        {project.homepage && (
                                            <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white uppercase tracking-wider border-b border-green-500 pb-1 hover:text-green-400">
                                                Visit Site
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            {data.experience && data.experience.length > 0 && (
                <section id="experience" className="py-20 px-6 lg:px-20 bg-black border-t border-gray-900">
                    <h2 className="text-4xl font-bold mb-16 flex items-center gap-4">
                        <span className="w-12 h-1 bg-green-500" />
                        EXPERIENCE
                    </h2>

                    <div className="space-y-12 max-w-4xl">
                        {data.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="border-l-2 border-green-900 pl-8 relative"
                            >
                                <div className="absolute top-0 left-[-9px] w-4 h-4 bg-black border-2 border-green-500 rounded-full" />
                                <span className="text-green-500 font-mono text-sm mb-2 block">{exp.duration}</span>
                                <h3 className="text-2xl font-bold text-white mb-1">{exp.role}</h3>
                                <div className="text-xl text-gray-400 mb-4">{exp.company}</div>
                                {Array.isArray(exp.description) ? (
                                    <ul className="list-disc list-outside ml-4 space-y-2 text-gray-400">
                                        {exp.description.map((point, i) => (
                                            <li key={i}>{point}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-20 px-6 lg:px-20 border-t border-gray-900">
                <div className="max-w-4xl">
                    <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
                        <span className="w-12 h-1 bg-green-500" />
                        LET'S CONNECT
                    </h2>
                    <div className="flex flex-wrap gap-8">
                        {data.contact.email && (
                            <a href={`mailto:${data.contact.email}`} className="text-2xl text-gray-400 hover:text-green-500 transition-colors font-light">
                                {data.contact.email}
                            </a>
                        )}
                        <a href={`https://github.com/${data.username}`} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-green-500 transition-colors font-light">
                            GitHub
                        </a>
                        {data.contact.linkedin && (
                            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-400 hover:text-green-500 transition-colors font-light">
                                LinkedIn
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
