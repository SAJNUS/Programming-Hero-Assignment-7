import { formatTimelineDate } from "../utils/timelineStorage";

const typeStyles = {
    call: "text-brand-700",
    text: "text-brand-700",
    video: "text-brand-700",
};

export default function TimelineItem({ entry, icon }) {
    return (
        <article className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                <img src={icon} alt="" aria-hidden="true" className="h-5 w-5" />
            </div>

            <div className="min-w-0">
                <h3
                    className={`truncate text-sm font-semibold ${typeStyles[entry.type] ?? "text-slate-800"}`}
                >
                    {entry.title}
                </h3>
                <p className="mt-0.5 text-xs text-slate-500">
                    {formatTimelineDate(entry.date)}
                </p>
            </div>
        </article>
    );
}
