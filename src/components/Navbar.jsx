import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import homeIcon from "../../assets/icons/home.svg";
import timelineIcon from "../../assets/icons/timeline.svg";
import statsIcon from "../../assets/icons/stats.svg";

const navItems = [
    { label: "Home", to: "/", icon: homeIcon },
    { label: "Timeline", to: "/timeline", icon: timelineIcon },
    { label: "Stats", to: "/stats", icon: statsIcon },
];

const linkClasses = ({ isActive }) =>
    [
        "inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
        isActive
            ? "bg-brand-700 text-white shadow-sm"
            : "text-slate-600 hover:bg-brand-50 hover:text-brand-700",
    ].join(" ");

export default function Navbar() {
    return (
        <header className="border-b border-slate-200 bg-white shadow-[0_1px_0_rgba(15,23,42,0.03)]">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
                <NavLink to="/" className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="KeenKeeper"
                        className="h-7 w-auto sm:h-8"
                    />
                </NavLink>

                <nav
                    aria-label="Main navigation"
                    className="flex items-center gap-2 sm:gap-3"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={linkClasses}
                            end={item.to === "/"}
                        >
                            {({ isActive }) => (
                                <>
                                    <img
                                        src={item.icon}
                                        alt=""
                                        aria-hidden="true"
                                        className={`h-4 w-4 shrink-0 ${
                                            isActive
                                                ? "brightness-0 invert"
                                                : "opacity-70"
                                        }`}
                                    />
                                    {item.label}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
