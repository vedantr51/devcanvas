export function Card({ children, className = "", hover = true, ...props }) {
    return (
        <div
            className={`bg-white rounded-2xl border border-[#e2e8f0] p-6 ${hover ? "card-shadow-hover" : "card-shadow"
                } ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
