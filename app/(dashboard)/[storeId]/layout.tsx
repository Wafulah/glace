import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { getStore} from "@/actions/get-store";
import Navbar from "@/components/navbar";


export default async function DashboardLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { storeId: string };
}) {
    const user = await currentUser();

    if (!user?.id) {
        redirect("auth/login");
    }

    
    const store = await getStore(params.storeId,user?.jwt_token as string);

    if (!store) {
        redirect("/auth/login");
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

