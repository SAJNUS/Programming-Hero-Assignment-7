import SummaryCard from "../components/SummaryCard";
import FriendCard from "../components/FriendCard";
import friends from "../data/friends.json";

const summaryCards = [
    { value: 10, label: "Total Friends" },
    { value: 3, label: "On Track" },
    { value: 6, label: "Need Attention" },
    { value: 12, label: "Interactions This Month" },
];

export default function Home() {
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

                <button className="mt-6 inline-flex items-center rounded-md bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-brand-800">
                    + Add a Friend
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
                    {friends.map((friend) => (
                        <FriendCard key={friend.id} friend={friend} />
                    ))}
                </div>
            </section>
        </section>
    );
}
