import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = {
    Text: "#7C3AED",
    Call: "#245845",
    Video: "#33A45D",
};

export default function InteractionPieChart({ data }) {
    return (
        <div className="mx-auto h-[320px] w-full max-w-xl">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="46%"
                        innerRadius={58}
                        outerRadius={88}
                        paddingAngle={5}
                        stroke="#f8fafc"
                        strokeWidth={4}
                    >
                        {data.map((entry) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[entry.name] ?? "#94A3B8"}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value, name) => [value, name]}
                        contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ paddingTop: "12px", fontSize: "13px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
