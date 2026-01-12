import { forwardRef } from "react";

export const Input = forwardRef(function Input(
    { label, error, className = "", ...props },
    ref
) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-[#475569] mb-1.5">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={`w-full px-4 py-3.5 bg-white border-2 border-[#e2e8f0] rounded-xl text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#6366f1] focus:ring-4 focus:ring-[#6366f1]/10 transition-all ${error ? "border-[#ef4444] focus:border-[#ef4444] focus:ring-[#ef4444]/10" : ""
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1.5 text-sm text-[#ef4444]">{error}</p>}
        </div>
    );
});
