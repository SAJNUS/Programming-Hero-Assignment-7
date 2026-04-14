export default function StatCard({ value, label }) {
    return (
        <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
            <div className="text-3xl font-semibold tracking-tight text-brand-700">
                {value}
            </div>
            <div className="mt-1 text-sm text-slate-500">{label}</div>
        </div>
    );
}
