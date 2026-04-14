import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 py-10 sm:py-14">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
