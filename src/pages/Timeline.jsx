import { useMemo, useState } from "react";
import TimelineItem from "../components/TimelineItem";
import { readTimelineEntries } from "../utils/timelineStorage";

import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

const filterOptions = [
    { value: "all", label: "All" },
    { value: "call", label: "Call" },
    { value: "text", label: "Text" },
    { value: "video", label: "Video" },
];

const typeIcons = {
    call: callIcon,
    text: textIcon,
    video: videoIcon,
};

function getTimestamp(dateValue) {
    const timestamp = new Date(dateValue).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

export default function Timeline() {
    const [selectedType, setSelectedType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    const entries = useMemo(() => readTimelineEntries(), []);

    const filteredEntries = useMemo(() => {
        const sorted = [...entries].sort(
            (a, b) => getTimestamp(b.date) - getTimestamp(a.date),
        );

        const byType =
            selectedType === "all"
                ? sorted
                : sorted.filter((entry) => entry.type === selectedType);

        const normalizedQuery = searchQuery.trim().toLowerCase();
        if (!normalizedQuery) return byType;

        return byType.filter((entry) =>
            entry.title.toLowerCase().includes(normalizedQuery),
        );
    }, [entries, selectedType, searchQuery]);

    return (
        <section className="page-shell py-6 sm:py-10">
            <h1 className="page-heading">Timeline</h1>

            <div className="mt-5 grid max-w-2xl gap-3 sm:grid-cols-2">
                <div>
                    <label htmlFor="timeline-filter" className="sr-only">
                        Filter timeline
                    </label>
                    <select
                        id="timeline-filter"
                        value={selectedType}
                        onChange={(event) =>
                            setSelectedType(event.target.value)
                        }
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm outline-none ring-brand-200 transition focus:ring-2"
                    >
                        {filterOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="timeline-search" className="sr-only">
                        Search timeline
                    </label>
                    <input
                        id="timeline-search"
                        type="text"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search timeline"
                        className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 shadow-sm outline-none ring-brand-200 transition focus:ring-2"
                    />
                </div>
            </div>

            <div className="mt-8 space-y-3">
                {entries.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
                        No timeline entries yet. Try a quick check-in from a
                        friend profile.
                    </div>
                ) : filteredEntries.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500 shadow-sm">
                        No matching timeline entries found.
                    </div>
                ) : (
                    filteredEntries.map((entry, index) => (
                        <TimelineItem
                            key={`${entry.title}-${entry.date}-${index}`}
                            entry={entry}
                            icon={typeIcons[entry.type] ?? callIcon}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
