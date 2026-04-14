import { NavLink } from "react-router-dom";

const navItems = [
    { label: "Home", to: "/" },
    { label: "Timeline", to: "/timeline" },
    { label: "Stats", to: "/stats" },
];

const linkClasses = ({ isActive }) =>
    [
        "rounded-md px-3 py-2 text-sm font-medium",
        isActive
            ? "bg-brand-700 text-white shadow-sm"
            : "text-slate-600 hover:bg-brand-50 hover:text-brand-700",
    ].join(" ");

export default function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="page-shell flex h-16 items-center justify-between gap-4">
                <NavLink
                    to="/"
                    className="text-lg font-bold tracking-tight text-brand-800"
                >
                    KeenKeeper
                </NavLink>

                <nav
                    aria-label="Main navigation"
                    className="flex items-center gap-2"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={linkClasses}
                            end={item.to === "/"}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
