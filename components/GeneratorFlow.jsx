"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ResumeUploader } from "./ResumeUploader";
import { TemplateSelector } from "./TemplateSelector";
import { Button } from "./ui/Button";

/**
 * Multi-step generator flow
 * Step 1: Enter GitHub username (handled by UsernameForm)
 * Step 2: Upload Resume (optional)
 * Step 3: Select Template
 * Step 4: Generate Portfolio
 */

export function GeneratorFlow({ username }) {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [resumeData, setResumeData] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState("modern-dev");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleResumeUpload = (data) => {
        setResumeData(data);
        setStep(2);
    };

    const handleSkipResume = () => {
        setSelectedTemplate("github-default");
        setStep(2);
    };

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const handleGenerate = async () => {
        setIsGenerating(true);

        const queryParams = new URLSearchParams();
        queryParams.set("template", selectedTemplate);
        queryParams.set("edit", "true");

        if (resumeData) {
            sessionStorage.setItem(`devcanvas_resume_${username.toLowerCase()}`, JSON.stringify(resumeData));
        }

        router.push(`/portfolio/${username}?${queryParams.toString()}`);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
                <StepIndicator number={1} label="Resume" active={step === 1} completed={step > 1} />
                <div className="w-8 h-0.5 bg-[#e2e8f0]" />
                <StepIndicator number={2} label="Template" active={step === 2} completed={step > 2} />
            </div>

            {/* Step Content */}
            <div className="min-h-[400px]">
                {step === 1 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-[#0f172a] mb-2">
                            Add your resume
                        </h2>
                        <p className="text-[#64748b] mb-8">
                            Enhance your portfolio with professional experience and education
                        </p>
                        <ResumeUploader
                            onUploadComplete={handleResumeUpload}
                            onSkip={handleSkipResume}
                        />
                    </div>
                )}

                {step === 2 && (
                    <div>
                        {resumeData && (
                            <div className="mb-6 p-4 bg-[#ecfdf5] border border-[#a7f3d0] rounded-xl text-center">
                                <p className="text-[#059669] font-medium">
                                    ✓ Resume loaded: {resumeData.name || "Ready"}
                                </p>
                            </div>
                        )}
                        <TemplateSelector
                            selected={selectedTemplate}
                            onSelect={handleTemplateSelect}
                            onContinue={handleGenerate}
                            hasResume={!!resumeData}
                        />
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between">
                {step > 1 ? (
                    <button
                        onClick={handleBack}
                        className="text-[#64748b] hover:text-[#0f172a] transition-colors font-medium"
                    >
                        ← Back
                    </button>
                ) : (
                    <div />
                )}

                {step === 1 && (
                    <Button
                        variant="ghost"
                        onClick={handleSkipResume}
                    >
                        Skip this step
                    </Button>
                )}
            </div>

            {/* Loading Overlay */}
            {isGenerating && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin mb-4" />
                        <p className="text-lg font-medium text-[#0f172a]">
                            Generating your portfolio...
                        </p>
                        <p className="text-[#64748b]">
                            Fetching GitHub data and applying template
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

function StepIndicator({ number, label, active, completed }) {
    return (
        <div className="flex items-center gap-2">
            <div
                className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                    ${completed
                        ? "bg-[#10b981] text-white"
                        : active
                            ? "bg-[#6366f1] text-white"
                            : "bg-[#e2e8f0] text-[#94a3b8]"
                    }
                `}
            >
                {completed ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                ) : (
                    number
                )}
            </div>
            <span className={`text-sm font-medium ${active ? "text-[#0f172a]" : "text-[#94a3b8]"}`}>
                {label}
            </span>
        </div>
    );
}
