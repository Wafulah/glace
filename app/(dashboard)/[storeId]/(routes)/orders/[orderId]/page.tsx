import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Metadata } from "next";

import { currentUser } from "@/lib/auth";
import { formatter } from "@/lib/utils";

import { OrderCol } from "./components/columns";
import { OrderClient } from "./components/client";
import { AddOrderForm } from "./components/add_order-form";
import { OrderProductModal } from "./components/order-products";
import { getOrder } from "@/actions/get-order";
import { getProducts } from "@/actions/get-products";
import { getCustomers } from "@/actions/get-customers";
import { defaultOrder } from "@/types";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

export const metadata: Metadata = {
  title: "Order",
};

const ProductPage = async ({
  params,
}: {
  params: { orderId: string; storeId: string };
}) => {
  const user = await currentUser();
  const order =
    (await getOrder(
      params.storeId,
      user?.jwt_token as string,
      params.orderId
    )) || defaultOrder;
  const products = await getProducts(params.storeId, user?.jwt_token as string);
  const customers = await getCustomers(
    params.storeId,
    user?.jwt_token as string
  );

  const orderDetails: OrderCol = {
    id: order?.id ?? "N/A",
    phone: order?.phone ?? "N/A",
    address: order?.address ?? "N/A",
    is_paid: order?.is_paid ?? false,
    is_delivered: order?.is_delivered ?? false,
    delivery_date: order?.delivery_date,
    created_at: order
      ? format(new Date(order.created_at), "MMMM do, yyyy")
      : "N/A",
    products: order
      ? order.order_items.map((orderItem) => ({
          name: orderItem.product.name,
          quantity: orderItem.quantity.toString(),
          price: formatter.format(Number(orderItem.product.price)),
          totalPrice: formatter.format(Number(orderItem.price)),
        }))
      : [],
  };
 console.log("page", order.order_items)
 console.log("order", order);
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AddOrderForm
          products={products}
          customers={customers}
          initialData={order}
          jwt_token={user?.jwt_token}
        />
        <OrderProductModal products={products} initialData={order.order_items} />
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        variant="public"
        description={`${origin}/api/${params.storeId}/${order.id}`}
      />
      </div>
    </div>
  );
};

export default ProductPage;
