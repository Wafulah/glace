import { Metadata } from "next";
import { currentUser } from "@/lib/auth";

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
  const user = await currentUser();
  const category = await getCustomer(
    params.storeId,
    user?.jwt_token as string,
    params.customerId
  );
  const jwt_token: string = user?.jwt_token || "";

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomerForm jwt_token={jwt_token} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
