const statusStyles = {
    overdue: "bg-red-50 text-red-600",
    "almost due": "bg-amber-50 text-amber-700",
    "on-track": "bg-emerald-50 text-emerald-700",
};

const statusLabels = {
    overdue: "Overdue",
    "almost due": "Almost Due",
    "on-track": "On Track",
};

export default function StatusBadge({ status }) {
    return (
        <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${statusStyles[status] ?? "bg-slate-100 text-slate-600"}`}
        >
            {statusLabels[status] ?? status}
        </span>
    );
}
