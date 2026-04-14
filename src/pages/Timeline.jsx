import { useMemo } from "react";
import {
    readTimelineEntries,
    formatTimelineDate,
} from "../utils/timelineStorage";

export default function Timeline() {
    const entries = useMemo(() => readTimelineEntries(), []);

    return (
        <section className="page-shell">
            <h1 className="page-heading">Timeline</h1>
            <p className="mt-3 max-w-2xl text-slate-500">
                Recent check-ins are saved here.
            </p>

            <div className="mt-8 space-y-3">
                {entries.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
                        No timeline entries yet. Try a quick check-in from a
                        friend profile.
                    </div>
                ) : (
                    entries.map((entry, index) => (
                        <div
                            key={`${entry.title}-${index}`}
                            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                        >
                            <div className="text-sm font-semibold capitalize text-brand-700">
                                {entry.type}
                            </div>
                            <div className="mt-1 text-base font-medium text-slate-800">
                                {entry.title}
                            </div>
                            <div className="mt-1 text-sm text-slate-500">
                                {formatTimelineDate(entry.date)}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
