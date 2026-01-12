import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";

const GENERATION_CONFIG = {
    temperature: 0.2,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

export async function parseResumeWithLLM(fileBuffer, fileName) {
    const apiKey = process.env.GEMINI_API_KEY;
    const ext = fileName.toLowerCase().split(".").pop();

    try {
        console.log(`Starting parsing for: ${fileName}`);

        if (!apiKey) {
            console.log("No API key, using fallback");
            return generateFallbackResume(fileName);
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: GENERATION_CONFIG
        });

        const prompt = `You are a resume parsing engine. Extract structured data from the resume.
Return ONLY valid JSON with this exact structure:
{
    "name": "Full Name",
    "title": "Job Title",
    "summary": "Professional summary",
    "email": "email@example.com",
    "phone": "phone number",
    "linkedin": "linkedin URL",
    "website": "personal website URL",
    "experience": [{ "role": "Job Title", "company": "Company Name", "duration": "2020 - Present", "description": ["Achievement 1", "Achievement 2"] }],
    "education": [{ "degree": "Degree Name", "institution": "University Name", "year": "2020" }],
    "skills": ["Skill 1", "Skill 2"]
}`;

        let result;

        if (ext === "pdf") {
            const base64Data = fileBuffer.toString("base64");

            result = await model.generateContent([
                prompt,
                {
                    inlineData: {
                        mimeType: "application/pdf",
                        data: base64Data
                    }
                }
            ]);
        } else if (ext === "docx" || ext === "doc") {
            const textResult = await mammoth.extractRawText({ buffer: fileBuffer });
            const text = textResult.value.slice(0, 30000);

            result = await model.generateContent([
                prompt,
                `Resume Text:\n${text}`
            ]);
        } else {
            throw new Error("Unsupported file type");
        }

        const responseText = result.response.text();
        console.log("Gemini response received");

        let parsed;
        try {
            const cleanJson = responseText.replace(/```json\n?|\n?```/g, "").trim();
            parsed = JSON.parse(cleanJson);
        } catch (parseErr) {
            console.error("JSON parse error:", parseErr);
            return generateFallbackResume(fileName);
        }

        return normalizeResponse(parsed);

    } catch (error) {
        console.error("Resume parsing error:", error.message);
        return generateFallbackResume(fileName);
    }
}

function generateFallbackResume(fileName) {
    let nameGuess = "Your Name";

    if (fileName) {
        const cleaned = fileName
            .replace(/\.(pdf|docx?)$/i, "")
            .replace(/resume|cv|_|-/gi, " ")
            .trim();
        if (cleaned.length > 2) {
            nameGuess = cleaned.split(" ").map(w =>
                w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
            ).join(" ");
        }
    }

    return {
        name: nameGuess,
        title: "Software Developer",
        summary: "Experienced developer passionate about building great software.",
        contact: { email: "", linkedin: "", website: "", phone: "" },
        experience: [],
        education: [],
        skills: ["JavaScript", "React", "Node.js"]
    };
}

function normalizeResponse(data) {
    return {
        name: data.name || "Unknown",
        title: data.title || "Developer",
        summary: data.summary || "",
        contact: {
            email: data.email || data.contact?.email || "",
            linkedin: data.linkedin || data.contact?.linkedin || "",
            website: data.website || data.contact?.website || "",
            phone: data.phone || data.contact?.phone || ""
        },
        experience: Array.isArray(data.experience) ? data.experience : [],
        education: Array.isArray(data.education) ? data.education : [],
        skills: Array.isArray(data.skills) ? data.skills : []
    };
}
