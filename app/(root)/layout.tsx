import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { getStores } from "@/actions/get-stores";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth/login");
  }
  console.log("user", user);
  const stores = await getStores(user.session_token);

  if (stores && stores.length > 0) {
    const store = stores[0];
    if (store) {
      redirect(`/${store.id}`);
    }
  }

  return <>{children}</>;
}
