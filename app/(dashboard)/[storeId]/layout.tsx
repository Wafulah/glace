import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { UserRole, Allowed } from "@prisma/client";

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

    if (user?.allowed !== "YES") {
        
        redirect("/onboarding");
    } 

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: user?.id,
        },
    });

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

