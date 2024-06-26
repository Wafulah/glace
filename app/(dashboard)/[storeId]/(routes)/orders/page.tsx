import { format, parseISO } from "date-fns";
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
    customer: `${item.customer.first_name || ""}, ${
      item.customer.last_name || ""
    }`,
    products: item.order_items
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: formatter.format(
      item.order_items.reduce((total, item) => {
        return total + Number(item.price);
      }, 0)
    ),
    is_paid: item.is_paid,
    is_delivered: item.is_delivered,
    created_at: format(item.created_at, "MMMM do, yyyy"),
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
