import { useParams } from "react-router-dom";

export default function FriendDetails() {
    const { id } = useParams();

    return (
        <section className="page-shell">
            <h1 className="page-heading">Friend Details Page</h1>
            <p className="mt-4 max-w-2xl text-slate-600">
                Viewing friend with ID: {id}
            </p>
        </section>
    );
}
