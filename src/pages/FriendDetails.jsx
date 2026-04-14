import { useMemo } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import friends from "../data/friends.json";
import { getFriendAvatar } from "../data/friendAvatars";
import ActionButton from "../components/friend-details/ActionButton";
import Badge from "../components/friend-details/Badge";
import QuickCheckInButton from "../components/friend-details/QuickCheckInButton";
import StatCard from "../components/friend-details/StatCard";
import StatusBadge from "../components/friend-details/StatusBadge";
import { addTimelineEntry } from "../utils/timelineStorage";

import callIcon from "../../assets/call.png";
import textIcon from "../../assets/text.png";
import videoIcon from "../../assets/video.png";

function buildTimelineEntry(type, friendName) {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);

    return {
        date: new Date().toISOString(),
        type,
        title: `${capitalizedType} with ${friendName}`,
    };
}

export default function FriendDetails() {
    const { id } = useParams();

    const friend = useMemo(
        () => friends.find((entry) => entry.id === Number(id)),
        [id],
    );

    const handleCheckIn = (type) => {
        if (!friend) return;

        addTimelineEntry(buildTimelineEntry(type, friend.name));
        toast.success(
            `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friend.name} added`,
        );
    };

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
                </div>
            </div>
        </section>
    );
}
