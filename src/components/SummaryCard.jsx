export default function SummaryCard({ value, label }) {
    return (
        <div className="rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70 transition-shadow duration-200 hover:shadow-md">
            <div className="text-3xl font-semibold text-brand-700">{value}</div>
            <div className="mt-2 text-sm text-slate-500">{label}</div>
        </div>
    );
}
