"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Addresscolumns, columns, OrderCol } from "./columns";
import { OrderForm } from "./order-form";

interface OrderClientProps {
  data: OrderCol;
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
  const newOrderData = [
    {
      phone: data.phone,
      address: data.address,
      isPaid: data.is_paid,
      isDelivered: data.is_delivered,
      created_at: data.created_at,
    },
  ];

  const dataDelivery = {
    isDelivered: data.is_delivered,
    deliveryDate: data.delivery_date,
  };

  return (
    <>
      <Heading
        title={`Orders (${data.id})`}
        description="Manage order for your store"
      />
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data.products} />
      <OrderForm initialData={dataDelivery} />
    </>
  );
};
