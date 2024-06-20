import { Metadata } from "next";
import { useCurrentUser } from "@/hooks/use-current-user";

import { getCustomer } from "@/actions/get-customer";
import { CustomerForm } from "./components/customer-form";

export const metadata: Metadata = {
  title: "Customer",
};

const CategoryPage = async ({
  params,
}: {
  params: { customerId: string; storeId: string };
}) => {
  const user = await useCurrentUser();
  const category = await getCustomer(
    params.storeId,
    user?.session_token as string,
    params.customerId
  );
  const user_token: string = user?.session_token || "";

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerForm user_token={user_token} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
