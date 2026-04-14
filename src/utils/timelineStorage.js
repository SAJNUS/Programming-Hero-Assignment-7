const STORAGE_KEY = "keenkeeperTimelineEntries";

export function readTimelineEntries() {
    if (typeof window === "undefined") return [];

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

export function writeTimelineEntries(entries) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function addTimelineEntry(entry) {
    const entries = readTimelineEntries();
    const nextEntries = [entry, ...entries];
    writeTimelineEntries(nextEntries);
    return nextEntries;
}

export function formatTimelineDate(dateValue) {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(new Date(dateValue));
}
