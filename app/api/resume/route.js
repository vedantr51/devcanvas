import { NextResponse } from "next/server";
import { parseResumeWithLLM } from "@/lib/resumeParser";
import { validateResumeFile } from "@/lib/resumeValidation";

export const runtime = "nodejs";

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
        console.error("Resume parsing error:", error);

        if (error.message.includes("GEMINI_API_KEY")) {
            return NextResponse.json(
                { error: "Resume parsing AI is not configured" },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: error.message || "Failed to parse resume" },
            { status: 500 }
        );
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
