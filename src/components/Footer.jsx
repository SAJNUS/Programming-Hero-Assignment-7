import facebookIcon from "../../assets/facebook.png";
import instagramIcon from "../../assets/instagram.png";
import twitterIcon from "../../assets/twitter.png";

const footerLinks = ["Privacy Policy", "Terms of Service", "Cookies"];

const socialLinks = [
    { label: "Facebook", icon: facebookIcon },
    { label: "Instagram", icon: instagramIcon },
    { label: "Twitter", icon: twitterIcon },
];

export default function Footer() {
    return (
        <footer className="bg-brand-600 text-white">
            <div className="page-shell flex flex-col items-center py-14 sm:py-16">
                <div className="max-w-2xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        KeenKeeper
                    </h2>
                    <p className="mx-auto mt-3 max-w-2xl text-xs text-white/70 sm:text-sm">
                        Your personal shelf of meaningful connections. Browse,
                        tend, and nurture the relationships that matter most.
                    </p>

                    <div className="mt-6">
                        <p className="text-sm font-semibold text-white">
                            Social Links
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    aria-label={social.label}
                                    className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
                                >
                                    <img
                                        src={social.icon}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-10 w-10 object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex w-full flex-col gap-4 border-t border-white/10 pt-5 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} KeenKeeper. All rights
                        reserved.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-6 sm:justify-end">
                        {footerLinks.map((label) => (
                            <a
                                key={label}
                                href="#"
                                className="transition-colors hover:text-white"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
