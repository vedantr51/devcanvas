import { Button } from "./Button";

export function ErrorMessage({ error, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center text-center py-16 px-4">
            <div className="w-16 h-16 rounded-2xl bg-[#fef2f2] flex items-center justify-center mb-6">
                <svg
                    className="w-8 h-8 text-[#ef4444]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-[#0f172a] mb-2">
                {error.type === "not_found" && "User not found"}
                {error.type === "rate_limit" && "Rate limit exceeded"}
                {error.type === "network" && "Connection error"}
                {error.type === "unknown" && "Something went wrong"}
            </h2>
            <p className="text-[#475569] max-w-md mb-8">{error.message}</p>
            {onRetry && (
                <Button onClick={onRetry} variant="primary">
                    Try again
                </Button>
            )}
        </div>
    );
}
