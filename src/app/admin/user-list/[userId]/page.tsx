import { UserDetails } from "@/components/admin/components/UserList/userDetails";

export default async function Page({ params }: { params: Promise<{ userId: string }> }) {
    const { userId } = await params;

    return (
        <div>
            <UserDetails userId={userId} key={`userid-${userId}`} />
        </div>
    );
}
