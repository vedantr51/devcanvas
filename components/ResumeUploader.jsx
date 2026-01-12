"use client";

import { useState, useRef, useCallback } from "react";
import { validateResumeFile, getMaxFileSize } from "@/lib/resumeValidation";

export function ResumeUploader({ onUploadComplete, onSkip }) {
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, []);

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = async (file) => {
        setError(null);

        const validation = validateResumeFile(file);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        setIsUploading(true);
        setUploadProgress(10);

        try {
            const formData = new FormData();
            formData.append("file", file);

            setUploadProgress(30);

            const response = await fetch("/api/resume", {
                method: "POST",
                body: formData,
            });

            setUploadProgress(80);

            const text = await response.text();
            let result;

            try {
                result = text ? JSON.parse(text) : {};
            } catch {
                throw new Error("Server returned an invalid response. Please try again.");
            }

            if (!response.ok) {
                throw new Error(result.error || "Failed to parse resume");
            }

            setUploadProgress(100);

            if (onUploadComplete) {
                onUploadComplete(result.data);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    const maxSizeMB = getMaxFileSize() / (1024 * 1024);

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                onClick={!isUploading ? openFileDialog : undefined}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`
                    relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer
                    transition-all duration-200 ease-out
                    ${isDragging
                        ? "border-[#6366f1] bg-[#eef2ff] scale-[1.02]"
                        : "border-[#e2e8f0] bg-white hover:border-[#6366f1] hover:bg-[#f8fafc]"
                    }
                    ${isUploading ? "pointer-events-none opacity-75" : ""}
                `}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileSelect}
                    className="hidden"
                />

                {isUploading ? (
                    <div className="space-y-4">
                        <div className="w-12 h-12 mx-auto rounded-full border-4 border-[#6366f1] border-t-transparent animate-spin" />
                        <p className="text-[#475569] font-medium animate-pulse">
                            {uploadProgress < 30 ? "Reading file..." :
                                uploadProgress < 80 ? "Analysing with AI..." :
                                    "Finalizing..."}
                        </p>
                        <div className="w-full bg-[#e2e8f0] rounded-full h-2 overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#eef2ff] flex items-center justify-center">
                            <svg
                                className="w-8 h-8 text-[#6366f1]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                        </div>
                        <p className="text-[#0f172a] font-semibold mb-1">
                            Drop your resume here
                        </p>
                        <p className="text-sm text-[#94a3b8] mb-4">
                            or click to browse
                        </p>
                        <div className="flex items-center justify-center gap-2 text-xs text-[#94a3b8]">
                            <span className="px-2 py-1 bg-[#f1f5f9] rounded font-medium">PDF</span>
                            <span className="px-2 py-1 bg-[#f1f5f9] rounded font-medium">DOCX</span>
                            <span>up to {maxSizeMB}MB</span>
                        </div>
                    </>
                )}
            </div>

            {error && (
                <div className="mt-4 p-3 bg-[#fef2f2] border border-[#fecaca] rounded-xl text-center">
                    <p className="text-sm text-[#dc2626]">{error}</p>
                </div>
            )}

            <div className="mt-4 text-center">
                <p className="text-xs text-[#94a3b8] mb-3">
                    🔒 Your resume is processed securely and never stored
                </p>
                {onSkip && (
                    <button
                        onClick={onSkip}
                        className="text-sm text-[#6366f1] hover:text-[#4f46e5] font-medium transition-colors"
                    >
                        Skip for now →
                    </button>
                )}
            </div>
        </div>
    );
}
