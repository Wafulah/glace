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

export const metadata: Metadata = {
  title: "Order",
};

const ProductPage = async ({
  params,
}: {
  params: { orderId: string; storeId: string };
}) => {
  const user = await currentUser();
  const order = await getOrder(
    params.storeId,
    user?.session_token as string,
    params.orderId
  );
  const products = await getProducts(
    params.storeId,
    user?.session_token as string
  );
  const customers = await getCustomers(
    params.storeId,
    user?.session_token as string
  );
  if (!order) {
    redirect("/auth/login");
  }

  const orderDetails: OrderCol = {
    id: order?.id ?? "N/A",
    phone: order?.phone ?? "N/A",
    address: order?.address ?? "N/A",
    isPaid: order?.isPaid ?? false,
    isDelivered: order?.isDelivered ?? false,
    deliveryDate: order?.deliveryDate,
    createdAt: order
      ? format(new Date(order.createdAt), "MMMM do, yyyy")
      : "N/A",
    products: order
      ? order.orderItems.map((orderItem) => ({
          name: orderItem.product.name,
          quantity: orderItem.quantity.toString(),
          price: formatter.format(Number(orderItem.product.price)),
          totalPrice: formatter.format(Number(orderItem.price)),
        }))
      : [],
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AddOrderForm
          products={products}
          customers={customers}
          initialData={order}
          user_token={user?.session_token}
        />
        <OrderProductModal products={products} initialData={order.orderItems} />
      </div>
    </div>
  );
};

export default ProductPage;
