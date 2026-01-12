"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export function UsernameForm() {
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmed = username.trim();
        if (!trimmed) {
            setError("Please enter a GitHub username");
            return;
        }

        if (!/^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/.test(trimmed)) {
            setError("Invalid GitHub username format");
            return;
        }

        setLoading(true);
        setError("");
        router.push(`/generate/${trimmed}`);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex gap-3">
                <div className="flex-1">
                    <Input
                        type="text"
                        placeholder="Enter GitHub username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError("");
                        }}
                        error={error}
                        autoComplete="off"
                        autoFocus
                    />
                </div>
                <Button type="submit" loading={loading} size="lg">
                    Generate
                </Button>
            </div>
        </form>
    );
}
