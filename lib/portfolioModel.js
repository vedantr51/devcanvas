/**
 * Unified Portfolio Data Model
 * Merges GitHub data (projects) with Resume data (professional identity)
 */

/**
 * @typedef {Object} Experience
 * @property {string} role - Job title
 * @property {string} company - Company name
 * @property {string} duration - Time period (e.g., "Jan 2020 - Present")
 * @property {string[]} description - Bullet points describing responsibilities
 */

/**
 * @typedef {Object} Education
 * @property {string} degree - Degree name
 * @property {string} institution - School/University name
 * @property {string} [year] - Graduation year
 */

/**
 * @typedef {Object} Skill
 * @property {string} name - Skill name
 * @property {boolean} usedInProjects - Whether this skill appears in GitHub repos
 * @property {string} [source] - 'resume' | 'github' | 'both'
 */

/**
 * @typedef {Object} Contact
 * @property {string} [email] - Email address
 * @property {string} [linkedin] - LinkedIn URL
 * @property {string} [website] - Personal website
 * @property {string} [twitter] - Twitter/X handle
 */

/**
 * @typedef {Object} Project
 * @property {number} id - GitHub repo ID
 * @property {string} name - Repo name
 * @property {string} description - Repo description
 * @property {string} url - GitHub URL
 * @property {string} [homepage] - Live demo URL
 * @property {number} stars - Star count
 * @property {number} forks - Fork count
 * @property {string} language - Primary language
 * @property {string[]} topics - Repo topics
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} PortfolioData
 * @property {string} name - Full name (Resume > GitHub fallback)
 * @property {string} title - Professional title
 * @property {string} summary - Professional bio
 * @property {Experience[]} experience - Work history
 * @property {Education[]} education - Academic background
 * @property {Skill[]} skills - Merged skills list
 * @property {Contact} contact - Contact information
 * @property {string} username - GitHub username
 * @property {string} avatarUrl - GitHub avatar
 * @property {number} publicRepos - Total public repos
 * @property {string} createdAt - GitHub join date
 * @property {Project[]} projects - Curated GitHub projects
 * @property {string} template - Selected template name
 * @property {boolean} resumeUploaded - Whether resume data is available
 */

/**
 * Create an empty resume data structure
 * @returns {Object} Empty resume data
 */
export function createEmptyResumeData() {
    return {
        name: "",
        title: "",
        summary: "",
        experience: [],
        education: [],
        skills: [],
        contact: {
            email: "",
            linkedin: "",
            website: "",
        },
    };
}


/**
 * Merge GitHub data with Resume data into unified portfolio model
 * Priority: Resume > GitHub for identity fields
 * Priority: GitHub only for projects
 * 
 * @param {Object} githubData - Normalized GitHub user data
 * @param {Object} resumeData - Parsed resume data
 * @param {Object[]} projects - Curated GitHub projects
 * @param {Object[]} githubSkills - Derived skills from all repos
 * @param {string} template - Selected template name
 * @returns {PortfolioData} Unified portfolio data
 */
export function mergePortfolioData(githubData, resumeData, projects, githubSkills = [], template = "modern-dev") {
    const hasResume = resumeData && Object.keys(resumeData).length > 0;

    const mergedSkills = mergeSkills(
        resumeData?.skills || [],
        githubSkills
    );

    return {
        name: resumeData?.name || githubData.name || githubData.username,
        title: resumeData?.title || "",
        summary: resumeData?.summary || githubData.bio || "",
        experience: resumeData?.experience || [],
        education: resumeData?.education || [],
        skills: mergedSkills,
        contact: mergeContact(githubData, resumeData?.contact),
        username: githubData.username,
        avatarUrl: githubData.avatarUrl,
        publicRepos: githubData.publicRepos,
        createdAt: githubData.createdAt,
        projects: projects,
        template: template,
        resumeUploaded: hasResume,
    };
}

/**
 * Merge resume skills with GitHub derived skills
 * 
 * @param {string[]} resumeSkills - Skills from resume
 * @param {Object[]} githubSkills - Skills derived from GitHub ({name, percentage})
 * @returns {Skill[]} Merged skills array
 */
export function mergeSkills(resumeSkills, githubSkills) {
    const skillsMap = new Map();

    // 1. Add GitHub skills first (they have percentages)
    githubSkills.forEach(skill => {
        skillsMap.set(skill.name.toLowerCase(), {
            name: skill.name,
            percentage: skill.percentage,
            usedInProjects: true,
            source: "github"
        });
    });

    // 2. Merge Resume skills
    resumeSkills.forEach(skillName => {
        const normalized = skillName.toLowerCase();
        const existing = skillsMap.get(normalized);

        if (existing) {
            existing.source = "both";
            // Keep existing percentage from GitHub if available
        } else {
            skillsMap.set(normalized, {
                name: skillName,
                percentage: null, // No percentage validation for resume-only skills
                usedInProjects: false,
                source: "resume"
            });
        }
    });

    const skills = Array.from(skillsMap.values());

    skills.sort((a, b) => {
        // Source priority: Both > GitHub > Resume
        // Or maybe by percentage?
        // Let's prioritize "Both" (verified), then high percentage GitHub, then Resume.

        if (a.source === "both" && b.source !== "both") return -1;
        if (b.source === "both" && a.source !== "both") return 1;

        // If both are github/both, sort by percentage
        if (a.percentage && b.percentage) return b.percentage - a.percentage;

        // If one has percentage (github) and other doesn't (resume)
        if (a.percentage && !b.percentage) return -1;
        if (!a.percentage && b.percentage) return 1;

        return 0;
    });

    return skills;
}

/**
 * Merge contact information from GitHub and Resume
 * Resume takes priority for overlapping fields
 * 
 * @param {Object} githubData - GitHub user data
 * @param {Object} resumeContact - Contact info from resume
 * @returns {Contact} Merged contact information
 */
export function mergeContact(githubData, resumeContact) {
    return {
        email: resumeContact?.email || githubData.email || "",
        linkedin: resumeContact?.linkedin || "",
        website: resumeContact?.website || githubData.blog || "",
        twitter: githubData.twitterUsername || "",
    };
}

/**
 * Check if portfolio has experience data
 * @param {PortfolioData} data - Portfolio data
 * @returns {boolean}
 */
export function hasExperience(data) {
    return data.experience && data.experience.length > 0;
}

/**
 * Check if portfolio has education data
 * @param {PortfolioData} data - Portfolio data
 * @returns {boolean}
 */
export function hasEducation(data) {
    return data.education && data.education.length > 0;
}

/**
 * Check if portfolio has skills data
 * @param {PortfolioData} data - Portfolio data
 * @returns {boolean}
 */
export function hasSkills(data) {
    return data.skills && data.skills.length > 0;
}

/**
 * Check if portfolio has contact data
 * @param {PortfolioData} data - Portfolio data
 * @returns {boolean}
 */
export function hasContact(data) {
    const { contact } = data;
    return !!(contact.email || contact.linkedin || contact.website || contact.twitter);
}

/**
 * Get available template names
 * @returns {string[]} Array of template identifiers
 */
export function getAvailableTemplates() {
    return [
        "minimal-pro",
        "modern-dev",
        "resume-plus",
        "case-study",
        "creative-showcase",
    ];
}

/**
 * Get template metadata for UI display
 * @returns {Object[]} Template metadata array
 */
export function getTemplateMetadata() {
    return [
        {
            id: "github-default",
            name: "DevCanvas Minimal",
            description: "A clean, verified portfolio instantly generated from your GitHub profile.",
            style: "Clean",
            recommended: true,
        },
        {
            id: "minimal-pro",
            name: "Minimal Pro",
            description: "Split-layout design for professionals. Features a prominent headshot and clean typography.",
            style: "Professional",
            recommended: false,
        },
        {
            id: "modern-dev",
            name: "Modern Dev",
            description: "Dark-themed, tech-focused design with floating cards and purple accents.",
            style: "Modern",
            recommended: true,
        },
        {
            id: "resume-plus",
            name: "Resume+",
            description: "Clean, sidebar-based layout optimized for displaying heavy information density.",
            style: "Functional",
            recommended: false,
        },
        {
            id: "case-study",
            name: "Case Study",
            description: "Grid-based, white-space heavy layout ideal for UX researchers and designers.",
            style: "Minimalist",
            recommended: false,
        },
        {
            id: "creative-showcase",
            name: "Creative Showcase",
            description: "High-contrast dark mode with neon green accents and bold brand identity.",
            style: "Creative",
            recommended: false,
        },
    ];
}
