import "@/app/(user)/globals.css";
import PageNotFound from "@/components/shared/PageNotFound/PageNotFound";

export default function NotFoundPage() {
    return (
        <section style={{ background: "#F7F5F2", height: "100vh" }}>
            <PageNotFound />
        </section>
    )
}