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
    const languageCounts = {};
    let totalCount = 0;

    repos.forEach((repo) => {
        if (repo.language) {
            languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
            totalCount++;
        }
    });

    if (totalCount === 0) return [];

    return Object.entries(languageCounts)
        .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalCount) * 100),
        }))
        .sort((a, b) => b.percentage - a.percentage);
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
