import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Profile } from "@/app/(dashboard)/[storeId]/(protected)/_components/navbar";
import { getStores } from "@/actions/get-stores";



const Navbar = async () => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth/login");
  }

  const stores = await getStores(user.jwt_token);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4 mr-2">
          <ThemeToggle />
          
        </div>
        <Profile params={stores[0]?.id} />
      </div>
    </div>
  );
};

export default Navbar;