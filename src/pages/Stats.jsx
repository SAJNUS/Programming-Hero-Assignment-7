import { useMemo } from "react";
import InteractionPieChart from "../components/InteractionPieChart";
import { readTimelineEntries } from "../utils/timelineStorage";

function buildChartData(entries) {
    const counts = { call: 0, text: 0, video: 0 };

    entries.forEach((entry) => {
        if (counts[entry.type] !== undefined) {
            counts[entry.type] += 1;
        }
    });

    return [
        { name: "Text", value: counts.text },
        { name: "Call", value: counts.call },
        { name: "Video", value: counts.video },
    ];
}

export default function Stats() {
    const entries = useMemo(() => readTimelineEntries(), []);
    const chartData = useMemo(() => buildChartData(entries), [entries]);
    const totalInteractions = chartData.reduce(
        (total, item) => total + item.value,
        0,
    );

    return (
        <section className="page-shell py-6 sm:py-10">
            <h1 className="page-heading">Friendship Analytics</h1>

            <div className="mt-7 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                <h2 className="text-sm font-semibold text-brand-700">
                    By Interaction Type
                </h2>

                {totalInteractions === 0 ? (
                    <div className="flex h-[280px] items-center justify-center text-slate-500">
                        No interactions yet
                    </div>
                ) : (
                    <InteractionPieChart data={chartData} />
                )}
            </div>
        </section>
    );
}
