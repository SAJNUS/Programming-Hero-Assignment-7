import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <section className="page-shell flex min-h-[60vh] flex-col items-center justify-center text-center">
            <h1 className="page-heading">404 - Page Not Found</h1>
            <p className="mt-4 text-slate-600">
                Sorry, we couldn’t find that page.
            </p>
            <Link
                to="/"
                className="mt-6 inline-flex items-center rounded-md bg-brand-700 px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-800"
            >
                Back to Home
            </Link>
        </section>
    );
}
