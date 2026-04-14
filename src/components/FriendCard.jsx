import { Link } from "react-router-dom";

const statusStyles = {
    overdue: "bg-red-50 text-red-500",
    "almost due": "bg-amber-50 text-amber-600",
    "on-track": "bg-emerald-50 text-emerald-700",
};

const formatStatus = (status) =>
    status
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

export default function FriendCard({ friend }) {
    const statusClass =
        statusStyles[friend.status] ?? "bg-slate-100 text-slate-600";

    return (
        <Link
            to={`/friend/${friend.id}`}
            className="group block rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            aria-label={`View details for ${friend.name}`}
        >
            <img
                src={friend.picture}
                alt={friend.name}
                className="mx-auto h-14 w-14 rounded-full object-cover ring-4 ring-slate-100"
            />

            <h3 className="mt-4 text-base font-semibold text-slate-800">
                {friend.name}
            </h3>

            <p className="mt-1 text-xs text-slate-400">
                {friend.days_since_contact}d ago
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
                {friend.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-700"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div
                className={`mt-4 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${statusClass}`}
            >
                {formatStatus(friend.status)}
            </div>
        </Link>
    );
}
