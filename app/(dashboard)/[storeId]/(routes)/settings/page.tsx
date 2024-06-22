import { redirect } from "next/navigation";
import { Metadata } from "next";
import { currentUser } from "@/lib/auth";
import { getStore } from "@/actions/get-store";
import { getCategories } from "@/actions/get-categories";
import { getCounties } from "@/actions/get-counties";

import { SettingsForm } from "./components/settings-form";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser();

  if (!user?.id) {
    redirect("/auth/login");
  }

  const store = await getStore(params.storeId, user.jwt_token);

  if (!store) {
    redirect("/");
  }

  const categories = await getCategories(params.storeId, user.jwt_token);

  const counties = await getCounties(params.storeId,user.jwt_token);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm
          initialData={store}
          categories={categories}
          counties={counties}
        />
      </div>
    </div>
  );
};

export default SettingsPage;
