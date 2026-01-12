/**
 * Shared template primitives
 * Used across all templates for consistency
 */

export function SectionWrapper({
    children,
    className = "",
    id,
    background = "white"
}) {
    const bgClasses = {
        white: "bg-white",
        gray: "bg-[#f8fafc]",
        gradient: "bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#a855f7]",
        dark: "bg-[#0f172a]",
    };

    return (
        <section
            id={id}
            className={`py-16 md:py-20 px-6 md:px-12 ${bgClasses[background]} ${className}`}
        >
            <div className="max-w-5xl mx-auto">
                {children}
            </div>
        </section>
    );
}

export function SectionTitle({
    children,
    subtitle,
    align = "left",
    light = false
}) {
    const alignClasses = {
        left: "text-left",
        center: "text-center",
    };

    return (
        <div className={`mb-10 ${alignClasses[align]}`}>
            <h2 className={`text-2xl md:text-3xl font-bold ${light ? "text-white" : "text-[#0f172a]"}`}>
                {children}
            </h2>
            {subtitle && (
                <p className={`mt-2 ${light ? "text-white/70" : "text-[#64748b]"}`}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export function ProjectCard({ project, variant = "default" }) {
    const variants = {
        default: "bg-white border border-[#e2e8f0] hover:shadow-lg",
        elevated: "bg-white shadow-xl shadow-purple-500/5 hover:shadow-2xl",
        dark: "bg-[#1e293b] border border-[#334155] hover:border-[#475569]",
    };

    return (
        <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block p-6 rounded-2xl transition-all duration-200 ${variants[variant]}`}
        >
            <div className="flex items-start justify-between mb-3">
                <h3 className={`font-semibold group-hover:text-[#6366f1] transition-colors ${variant === "dark" ? "text-white" : "text-[#0f172a]"}`}>
                    {project.name}
                </h3>
                <svg
                    className={`w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity ${variant === "dark" ? "text-white" : "text-[#64748b]"}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </div>

            {project.description && (
                <p className={`text-sm mb-4 line-clamp-2 ${variant === "dark" ? "text-gray-400" : "text-[#64748b]"}`}>
                    {project.description}
                </p>
            )}

            <div className="flex items-center gap-4 text-xs">
                {project.language && (
                    <span className={`flex items-center gap-1.5 ${variant === "dark" ? "text-gray-400" : "text-[#64748b]"}`}>
                        <span className="w-3 h-3 rounded-full bg-[#6366f1]" />
                        {project.language}
                    </span>
                )}
                {project.stars > 0 && (
                    <span className={`flex items-center gap-1 ${variant === "dark" ? "text-gray-400" : "text-[#64748b]"}`}>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {project.stars}
                    </span>
                )}
            </div>

            {project.topics?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {project.topics.slice(0, 3).map((topic) => (
                        <span
                            key={topic}
                            className={`px-2 py-0.5 text-xs rounded ${variant === "dark" ? "bg-[#334155] text-gray-300" : "bg-[#f1f5f9] text-[#64748b]"}`}
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            )}
        </a>
    );
}

export function SkillBadge({ skill, variant = "default" }) {
    const variants = {
        default: "bg-[#f1f5f9] text-[#475569]",
        primary: "bg-[#eef2ff] text-[#6366f1]",
        dark: "bg-[#334155] text-gray-300",
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${variants[variant]}`}>
            {skill.name}
            {skill.usedInProjects && (
                <svg className="w-3.5 h-3.5 text-[#10b981]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            )}
        </span>
    );
}

export function ExperienceItem({ experience, variant = "default" }) {
    const isLight = variant === "light";

    return (
        <div className="relative pl-6 pb-8 last:pb-0 border-l-2 border-[#e2e8f0] last:border-transparent">
            <div className="absolute left-0 top-0 w-3 h-3 -translate-x-[7px] rounded-full bg-[#6366f1]" />

            <div className="mb-1">
                <h3 className={`font-semibold ${isLight ? "text-white" : "text-[#0f172a]"}`}>
                    {experience.role}
                </h3>
                <p className={`text-sm ${isLight ? "text-white/70" : "text-[#6366f1]"}`}>
                    {experience.company}
                </p>
            </div>

            {experience.duration && (
                <p className={`text-xs mb-2 ${isLight ? "text-white/50" : "text-[#94a3b8]"}`}>
                    {experience.duration}
                </p>
            )}

            {experience.description?.length > 0 && (
                <ul className={`text-sm space-y-1 ${isLight ? "text-white/80" : "text-[#64748b]"}`}>
                    {experience.description.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} className="flex gap-2">
                            <span className="text-[#6366f1]">•</span>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export function EducationItem({ education, variant = "default" }) {
    const isLight = variant === "light";

    return (
        <div className={`p-4 rounded-xl ${isLight ? "bg-white/10" : "bg-[#f8fafc]"}`}>
            <h3 className={`font-semibold ${isLight ? "text-white" : "text-[#0f172a]"}`}>
                {education.degree}
            </h3>
            <p className={`text-sm ${isLight ? "text-white/70" : "text-[#64748b]"}`}>
                {education.institution}
            </p>
            {education.year && (
                <p className={`text-xs mt-1 ${isLight ? "text-white/50" : "text-[#94a3b8]"}`}>
                    {education.year}
                </p>
            )}
        </div>
    );
}

export function ContactLink({ type, value, variant = "default" }) {
    if (!value) return null;

    const icons = {
        email: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        linkedin: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
        website: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
        ),
        twitter: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        github: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
        ),
    };

    const hrefs = {
        email: `mailto:${value}`,
        linkedin: value.startsWith("http") ? value : `https://${value}`,
        website: value.startsWith("http") ? value : `https://${value}`,
        twitter: value.startsWith("@") ? `https://twitter.com/${value.slice(1)}` : `https://twitter.com/${value}`,
        github: `https://github.com/${value}`,
    };

    const isLight = variant === "light";

    return (
        <a
            href={hrefs[type]}
            target={type === "email" ? undefined : "_blank"}
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${isLight
                    ? "bg-white/10 text-white hover:bg-white/20"
                    : "bg-[#f1f5f9] text-[#475569] hover:bg-[#e2e8f0]"
                }`}
        >
            {icons[type]}
            <span className="text-sm font-medium">{type === "email" ? value : type.charAt(0).toUpperCase() + type.slice(1)}</span>
        </a>
    );
}
