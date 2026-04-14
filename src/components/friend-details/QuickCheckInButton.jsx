export default function QuickCheckInButton({ icon, label, onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex h-full min-h-[92px] flex-col items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700 transition-all duration-200 hover:border-brand-100 hover:bg-brand-50"
        >
            <img src={icon} alt="" aria-hidden="true" className="h-7 w-7" />
            <span className="text-sm font-medium">{label}</span>
        </button>
    );
}
