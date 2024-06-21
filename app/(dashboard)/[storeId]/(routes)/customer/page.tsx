import { Metadata } from "next";
import { format } from "date-fns";

import { getCustomers } from "@/actions/get-customers";
import { CustomerColumn } from "./components/columns";
import { CustomersClient } from "./components/client";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Customers",
};

const CustomersPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser();
  const customers = await getCustomers(
    params.storeId,
    user?.jwt_token as string
  );

  const formattedCustomers: CustomerColumn[] = customers.map((item) => ({
    id: item.id,
    firstName: item.firstName,
    lastName: item.lastName,
    phoneNumber: item.phoneNumber,
    email: item.email,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CustomersClient data={formattedCustomers} />
      </div>
    </div>
  );
};

export default CustomersPage;
