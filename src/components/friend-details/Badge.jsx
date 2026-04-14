export default function Badge({ children }) {
    return (
        <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold tracking-wide text-emerald-700">
            {children}
        </span>
    );
}
