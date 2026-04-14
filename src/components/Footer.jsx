export default function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="page-shell py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} KeenKeeper. All rights reserved.
            </div>
        </footer>
    );
}
