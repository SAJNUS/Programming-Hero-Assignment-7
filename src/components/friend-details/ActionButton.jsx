export default function ActionButton({ children, variant = "default" }) {
    const styles = {
        default: "border-slate-200 text-slate-700 hover:bg-slate-50",
        danger: "border-red-200 text-red-500 hover:bg-red-50",
    };

    return (
        <button
            type="button"
            className={`w-full rounded-md border bg-white px-4 py-3 text-sm font-medium transition-colors duration-200 ${styles[variant]}`}
        >
            {children}
        </button>
    );
}
