import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import friends from "../data/friends.json";
import {
    getFriendAvatar,
    getFriendAvatarFallback,
} from "../data/friendAvatars";
import ActionButton from "../components/friend-details/ActionButton";
import Badge from "../components/friend-details/Badge";
import QuickCheckInButton from "../components/friend-details/QuickCheckInButton";
import StatCard from "../components/friend-details/StatCard";
import StatusBadge from "../components/friend-details/StatusBadge";
import {
    addTimelineEntry,
    formatTimelineDate,
    readTimelineEntries,
} from "../utils/timelineStorage";

import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

const typeIcons = {
    call: callIcon,
    text: textIcon,
    video: videoIcon,
};

function buildTimelineEntry(type, friend) {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    return {
        date: new Date().toISOString(),
        type,
        friendId: friend.id,
        friendName: friend.name,
        title: `${capitalizedType} with ${friend.name}`,
    };
}

function getTimestamp(dateValue) {
    const timestamp = new Date(dateValue).getTime();
    return Number.isNaN(timestamp) ? 0 : timestamp;
}

export default function FriendDetails() {
    const { id } = useParams();
    const [timelineEntries, setTimelineEntries] = useState(() =>
        readTimelineEntries(),
    );

    const friend = useMemo(
        () => friends.find((entry) => entry.id === Number(id)),
        [id],
    );

    const handleCheckIn = (type) => {
        if (!friend) return;

        const nextEntries = addTimelineEntry(buildTimelineEntry(type, friend));
        setTimelineEntries(nextEntries);
        toast.success(
            `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friend.name} added`,
        );
    };

    const recentInteractions = useMemo(() => {
        if (!friend) return [];

        const normalizedFriendName = friend.name.toLowerCase();

        return timelineEntries
            .filter((entry) => {
                if (entry.friendId === friend.id) return true;
                if (entry.friendName?.toLowerCase() === normalizedFriendName) {
                    return true;
                }

                return entry.title
                    ?.toLowerCase()
                    .includes(`with ${normalizedFriendName}`);
            })
            .sort((a, b) => getTimestamp(b.date) - getTimestamp(a.date))
            .slice(0, 4);
    }, [friend, timelineEntries]);

    if (!friend) {
        return (
            <section className="page-shell py-10">
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200/70">
                    <h1 className="text-2xl font-bold text-slate-800">
                        Friend not found
                    </h1>
                    <p className="mt-3 text-slate-500">
                        The profile you’re looking for doesn’t exist.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="page-shell py-8 sm:py-10">
            <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
                <aside className="lg:col-span-4">
                    <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200/70">
                        <img
                            src={getFriendAvatar(friend.picture)}
                            alt={friend.name}
                            className="mx-auto h-20 w-20 rounded-full object-cover ring-4 ring-slate-100"
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src =
                                    getFriendAvatarFallback(friend.picture);
                            }}
                        />

                        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-800">
                            {friend.name}
                        </h1>

                        <div className="mt-3">
                            <StatusBadge status={friend.status} />
                        </div>

                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {friend.tags.map((tag) => (
                                <Badge key={tag}>{tag}</Badge>
                            ))}
                        </div>

                        <p className="mt-5 text-sm italic text-slate-500">
                            “{friend.bio}”
                        </p>

                        <p className="mt-3 text-sm text-slate-500">
                            Preferred:{" "}
                            <span className="font-medium text-slate-700">
                                {friend.email}
                            </span>
                        </p>
                    </div>

                    <div className="mt-4 space-y-3">
                        <ActionButton>Snooze 2 Weeks</ActionButton>
                        <ActionButton>Archive</ActionButton>
                        <ActionButton variant="danger">Delete</ActionButton>
                    </div>
                </aside>

                <div className="space-y-5 lg:col-span-8">
                    <div className="grid gap-4 md:grid-cols-3">
                        <StatCard
                            value={friend.days_since_contact}
                            label="Days Since Contact"
                        />
                        <StatCard value={friend.goal} label="Goal (Days)" />
                        <StatCard
                            value={friend.next_due_date}
                            label="Next Due Date"
                        />
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Relationship Goal
                                </h2>
                                <p className="mt-3 text-slate-600">
                                    Connect every{" "}
                                    <span className="font-semibold text-slate-800">
                                        {friend.goal} days
                                    </span>
                                </p>
                            </div>

                            <button
                                type="button"
                                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-50"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Quick Check-In
                        </h2>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <QuickCheckInButton
                                icon={callIcon}
                                label="Call"
                                onClick={() => handleCheckIn("call")}
                            />
                            <QuickCheckInButton
                                icon={textIcon}
                                label="Text"
                                onClick={() => handleCheckIn("text")}
                            />
                            <QuickCheckInButton
                                icon={videoIcon}
                                label="Video"
                                onClick={() => handleCheckIn("video")}
                            />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200/70">
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Recent Interactions
                            </h2>

                            <Link
                                to="/timeline"
                                className="text-sm font-medium text-brand-700 hover:text-brand-800"
                            >
                                Full History
                            </Link>
                        </div>

                        {recentInteractions.length === 0 ? (
                            <p className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                                No interactions yet for {friend.name}. Try a
                                quick check-in above.
                            </p>
                        ) : (
                            <div className="mt-4 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
                                {recentInteractions.map((entry, index) => (
                                    <article
                                        key={`${entry.title}-${entry.date}-${index}`}
                                        className="flex items-start gap-3 px-4 py-3"
                                    >
                                        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                            <img
                                                src={
                                                    typeIcons[entry.type] ??
                                                    callIcon
                                                }
                                                alt=""
                                                aria-hidden="true"
                                                className="h-4 w-4"
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-semibold capitalize text-slate-800">
                                                {entry.type}
                                            </p>
                                            <p className="truncate text-xs text-slate-500">
                                                {entry.title}
                                            </p>
                                        </div>

                                        <p className="shrink-0 text-xs text-slate-500">
                                            {formatTimelineDate(entry.date)}
                                        </p>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
