import { useEffect, useMemo, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import FriendCard from "../components/FriendCard";
import friends from "../data/friends.json";
import addFriendIcon from "../../assets/icons/add-friend.svg";

const summaryCards = [
    { value: 10, label: "Total Friends" },
    { value: 3, label: "On Track" },
    { value: 6, label: "Need Attention" },
    { value: 12, label: "Interactions This Month" },
];

export default function Home() {
    const [isLoadingFriends, setIsLoadingFriends] = useState(true);
    const [friendsData, setFriendsData] = useState([]);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setFriendsData(friends);
            setIsLoadingFriends(false);
        }, 1500);

        return () => window.clearTimeout(timeoutId);
    }, []);

    const skeletonCards = useMemo(() => Array.from({ length: 8 }), []);

    return (
        <section className="page-shell py-6 sm:py-10">
            <div className="mx-auto max-w-4xl text-center">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl lg:text-5xl">
                    Friends to keep close in your life
                </h1>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
                    Your personal shelf of meaningful connections. Browse, tend,
                    and nurture the relationships that matter most.
                </p>

                <button className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-800">
                    <img
                        src={addFriendIcon}
                        alt=""
                        aria-hidden="true"
                        className="h-4 w-4 shrink-0 brightness-0 invert"
                    />
                    <span>+ Add a Friend</span>
                </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                {summaryCards.map((card) => (
                    <SummaryCard
                        key={card.label}
                        value={card.value}
                        label={card.label}
                    />
                ))}
            </div>

            <section className="mt-12 border-t border-slate-200 pt-10">
                <h2 className="text-lg font-semibold text-slate-800 sm:text-xl">
                    Your Friends
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {isLoadingFriends
                        ? skeletonCards.map((_, index) => (
                              <div
                                  key={`friend-skeleton-${index}`}
                                  className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-200/70"
                              >
                                  <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-slate-200" />
                                  <div className="mx-auto mt-4 h-4 w-24 animate-pulse rounded bg-slate-200" />
                                  <div className="mx-auto mt-2 h-3 w-16 animate-pulse rounded bg-slate-100" />
                                  <div className="mx-auto mt-4 h-5 w-20 animate-pulse rounded-full bg-slate-200" />
                              </div>
                          ))
                        : friendsData.map((friend) => (
                              <FriendCard key={friend.id} friend={friend} />
                          ))}
                </div>
            </section>
        </section>
    );
}
