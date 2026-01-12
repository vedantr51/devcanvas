import { NextResponse } from "next/server";
import { parseResumeWithLLM } from "@/lib/resumeParser";
import { validateResumeFile } from "@/lib/resumeValidation";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        const validation = validateResumeFile(file);

        if (!validation.valid) {
            return NextResponse.json(
                { error: validation.error },
                { status: 400 }
            );
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const resumeData = await parseResumeWithLLM(buffer, file.name);

        return NextResponse.json({
            success: true,
            data: resumeData,
        });
    } catch (error) {
        console.error("Resume API error:", error);

        return NextResponse.json({
            success: true,
            data: {
                name: "Your Name",
                title: "Software Developer",
                summary: "Experienced developer passionate about building great software.",
                contact: { email: "", linkedin: "", website: "", phone: "" },
                experience: [],
                education: [],
                skills: ["JavaScript", "React", "Node.js"]
            },
            warning: "Could not parse resume. Using default template."
        });
    }
}

export async function GET() {
    return NextResponse.json({
        supported_formats: ["pdf", "docx"],
        max_file_size: "5MB",
        fields_extracted: [
            "name",
            "title",
            "summary",
            "experience",
            "education",
            "skills",
            "contact"
        ],
    });
}
