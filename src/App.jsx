import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import FriendDetails from "./pages/FriendDetails";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Stats from "./pages/Stats";
import Timeline from "./pages/Timeline";

export default function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/friend/:id" element={<FriendDetails />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}
