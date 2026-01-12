"use client";

import dynamic from "next/dynamic";

const MinimalProTemplate = dynamic(() =>
    import("./minimal-pro/MinimalProTemplate").then(mod => mod.MinimalProTemplate),
    { loading: () => <TemplateLoading /> }
);

const ModernDevTemplate = dynamic(() =>
    import("./modern-dev/ModernDevTemplate").then(mod => mod.ModernDevTemplate),
    { loading: () => <TemplateLoading /> }
);

const GitHubDefaultTemplate = dynamic(() =>
    import("./github-default/GitHubDefaultTemplate").then(mod => mod.GitHubDefaultTemplate),
    { loading: () => <TemplateLoading /> }
);

const ResumePlusTemplate = dynamic(() =>
    import("./resume-plus/ResumePlusTemplate").then(mod => mod.ResumePlusTemplate),
    { loading: () => <TemplateLoading /> }
);

const CaseStudyTemplate = dynamic(() =>
    import("./case-study/CaseStudyTemplate").then(mod => mod.CaseStudyTemplate),
    { loading: () => <TemplateLoading /> }
);

const CreativeShowcaseTemplate = dynamic(() =>
    import("./creative-showcase/CreativeShowcaseTemplate").then(mod => mod.CreativeShowcaseTemplate),
    { loading: () => <TemplateLoading /> }
);

function TemplateLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
            <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin" />
                <p className="mt-4 text-[#64748b]">Loading template...</p>
            </div>
        </div>
    );
}

const templateComponents = {
    "minimal-pro": MinimalProTemplate,
    "modern-dev": ModernDevTemplate,
    "github-default": GitHubDefaultTemplate,
    "resume-plus": ResumePlusTemplate,
    "case-study": CaseStudyTemplate,
    "creative-showcase": CreativeShowcaseTemplate,
};

/**
 * Dynamic template renderer
 * Templates are presentation-only components
 * They receive the same data and differ only in layout/style
 * 
 * @param {Object} props
 * @param {string} props.templateName - Template identifier
 * @param {Object} props.data - Unified portfolio data
 * @param {Object[]} props.projects - Featured projects array
 */
export function TemplateRenderer({ templateName, data, projects }) {
    const Template = templateComponents[templateName] || ModernDevTemplate;

    return (
        <Template
            data={data}
            projects={projects}
        />
    );
}

/**
 * Get list of available template names
 */
export function getAvailableTemplateNames() {
    return Object.keys(templateComponents);
}
