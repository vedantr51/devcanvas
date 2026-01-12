/**
 * Validation utilities for resume files
 * Shared between client and server
 */

/**
 * Get maximum file size for upload (in bytes)
 * @returns {number} Max file size (5MB)
 */
export function getMaxFileSize() {
    return 5 * 1024 * 1024;
}

/**
 * Validate resume file for upload
 * @param {File} file - File object to validate
 * @returns {{valid: boolean, error?: string}}
 */
export function validateResumeFile(file) {
    if (!file) {
        return { valid: false, error: "No file provided" };
    }

    // Check size using the exported function
    if (file.size > getMaxFileSize()) {
        return {
            valid: false,
            error: "File size must be less than 5MB"
        };
    }

    // Check extension
    const fileName = file.name || "";
    const ext = fileName.toLowerCase().split(".").pop();
    if (!["pdf", "docx", "doc"].includes(ext)) {
        return { valid: false, error: "Only PDF and DOCX files are supported" };
    }

    return { valid: true };
}
