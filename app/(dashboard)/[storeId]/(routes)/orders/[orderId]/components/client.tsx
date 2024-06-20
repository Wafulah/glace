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
            isPaid: data.isPaid,
            isDelivered: data.isDelivered,
            createdAt: data.createdAt,
        },
    ];

    const dataDelivery = { isDelivered: data.isDelivered,deliveryDate:data.deliveryDate };

    return (
        <>
            <Heading
                title={`Orders (${data.id})`}
                description="Manage order for your store"
            />
            <Separator />

            <DataTable
                searchKey="product"
                columns={Addresscolumns}
                data={newOrderData}
            />
            <DataTable
                searchKey="name"
                columns={columns}
                data={data.products}
            />
            <OrderForm initialData={dataDelivery} />
        </>
    );
};

