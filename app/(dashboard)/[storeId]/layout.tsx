import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface DashboardLayoutProps {
    children: React.ReactNode;
    params: Promise<{ storeId: string }>;
}

export default async function DashboardLayout({
    children,
    params,
}: DashboardLayoutProps) {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Await the params first
    const { storeId } = await params;

    // Check for create-store route
    if (storeId === "create-store") {
        return <>{children}</>;
    }

    // Check existing store
    const store = await prismadb.store.findFirst({
        where: {
            id: storeId,
            userId,
        },
    });

    if (!store && storeId !== "create-store") {
        redirect("/");
    }

    return <>{children}</>;
}

