/**
 * Normalize raw GitHub user data into clean internal structure
 * @param {Object} rawUser - Raw GitHub API user response
 * @returns {Object} Normalized user object
 */
export function normalizeUser(rawUser) {
    return {
        name: rawUser.name || rawUser.login,
        username: rawUser.login,
        bio: rawUser.bio || "",
        avatarUrl: rawUser.avatar_url,
        location: rawUser.location || "",
        blog: rawUser.blog || "",
        email: rawUser.email || "",
        twitterUsername: rawUser.twitter_username || "",
        publicRepos: rawUser.public_repos || 0,
        followers: rawUser.followers || 0,
        following: rawUser.following || 0,
        createdAt: rawUser.created_at,
    };
}

/**
 * Normalize raw GitHub repository data
 * @param {Object} rawRepo - Raw GitHub API repo response
 * @returns {Object} Normalized repository object
 */
export function normalizeRepo(rawRepo) {
    return {
        id: rawRepo.id,
        name: rawRepo.name,
        fullName: rawRepo.full_name,
        description: rawRepo.description || "",
        url: rawRepo.html_url,
        homepage: rawRepo.homepage || "",
        stars: rawRepo.stargazers_count || 0,
        forks: rawRepo.forks_count || 0,
        language: rawRepo.language || "",
        updatedAt: new Date(rawRepo.updated_at),
        pushedAt: new Date(rawRepo.pushed_at),
        topics: rawRepo.topics || [],
        isForked: rawRepo.fork || false,
    };
}

/**
 * Get top repositories sorted by stars then by recent activity
 * @param {Array} repos - Array of normalized repositories
 * @param {number} limit - Max number of repos to return
 * @returns {Array} Top repositories
 */
export function getTopRepos(repos, limit = 6) {
    return [...repos]
        .filter((repo) => !repo.isForked)
        .sort((a, b) => {
            if (b.stars !== a.stars) return b.stars - a.stars;
            return b.pushedAt - a.pushedAt;
        })
        .slice(0, limit);
}

/**
 * Derive skills from repository languages
 * @param {Array} repos - Array of normalized repositories
 * @returns {Array} Skills sorted by usage percentage
 */
export function deriveSkills(repos) {
    const skillCounts = {};
    let totalCount = 0;

    const TOPIC_MAP = {
        "react": "React",
        "reactjs": "React",
        "react-js": "React",
        "next": "Next.js",
        "nextjs": "Next.js",
        "next.js": "Next.js",
        "next-js": "Next.js",
        "vue": "Vue.js",
        "vuejs": "Vue.js",
        "angular": "Angular",
        "angularjs": "Angular",
        "node": "Node.js",
        "nodejs": "Node.js",
        "typescript": "TypeScript",
        "ts": "TypeScript",
        "javascript": "JavaScript",
        "js": "JavaScript",
        "python": "Python",
        "py": "Python",
        "tailwindcss": "Tailwind CSS",
        "tailwind": "Tailwind CSS",
        "css": "CSS",
        "css3": "CSS",
        "html": "HTML",
        "html5": "HTML",
        "git": "Git",
        "docker": "Docker",
        "aws": "AWS",
        "firebase": "Firebase",
        "mongodb": "MongoDB",
        "mongo": "MongoDB",
        "postgres": "PostgreSQL",
        "postgresql": "PostgreSQL",
        "graphql": "GraphQL",
        "java": "Java",
        "rust": "Rust",
        "go": "Go",
        "golang": "Go",
        "flutter": "Flutter",
        "dart": "Dart",
        "c#": "C#",
        "c++": "C++",
        "c": "C",
        "php": "PHP",
        "laravel": "Laravel",
        "django": "Django",
        "flask": "Flask",
        "spring": "Spring",
        "express": "Express",
        "redux": "Redux",
        "jquery": "jQuery",
    };

    // Words to ignore to prevent false positives in heuristic scan
    const IGNORE_WORDS = new Set(["next", "go", "c", "js", "ts", "py"]);

    repos.forEach((repo) => {
        const uniqueRepoSkills = new Set();

        // 1. Primary Language
        if (repo.language) uniqueRepoSkills.add(repo.language);

        // 2. Topics
        if (repo.topics && Array.isArray(repo.topics)) {
            repo.topics.forEach(t => {
                const mapped = TOPIC_MAP[t.toLowerCase()];
                if (mapped) uniqueRepoSkills.add(mapped);
            });
        }

        // 3. Heuristic Scan (Name & Description)
        const textToScan = ((repo.name || "") + " " + (repo.description || "")).toLowerCase();

        Object.keys(TOPIC_MAP).forEach(key => {
            if (IGNORE_WORDS.has(key)) return;

            // Escape key for regex
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(?:^|[^a-z0-9])${escapedKey}(?:$|[^a-z0-9])`, 'i');

            if (regex.test(textToScan)) {
                uniqueRepoSkills.add(TOPIC_MAP[key]);
            }
        });

        // Add to totals
        uniqueRepoSkills.forEach(skill => {
            skillCounts[skill] = (skillCounts[skill] || 0) + 1;
            totalCount++;
        });
    });

    if (totalCount === 0) return [];

    return Object.entries(skillCounts)
        .map(([name, count]) => ({
            name,
            percentage: Math.min(95, Math.round((count / Math.max(1, totalCount / 2.5)) * 100)),
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 15);
}

/**
 * Check if user has contact information available
 * @param {Object} user - Normalized user object
 * @returns {boolean}
 */
export function hasContactInfo(user) {
    return !!(user.email || user.blog || user.twitterUsername);
}

/**
 * Get formatted GitHub join date
 * @param {string} createdAt - ISO date string
 * @returns {string} Formatted date like "January 2020"
 */
export function formatJoinDate(createdAt) {
    const date = new Date(createdAt);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}
