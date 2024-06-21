import { format } from "date-fns";
import { Metadata } from "next";
import { currentUser } from "@/lib/auth";

import { formatter } from "@/lib/utils";

import { getOrders } from "@/actions/get-orders";
import { OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";

export const metadata: Metadata = {
  title: "Orders",
};

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser();
  const orders = await getOrders(params.storeId, user?.jwt_token as string);

  const formattedOrders: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    customer: `${item.customer.firstName || ""}, ${
      item.customer.lastName || ""
    }`,
    products: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    isPaid: item.isPaid,
    isDelivered: item.isDelivered,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
