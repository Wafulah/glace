"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { LuPlus as Plus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { ApiList } from "@/components/ui/api-list";

import { columns, OrderColumn } from "./columns";

interface OrderClientProps {
    data: OrderColumn[];
}

export const OrderClient: React.FC<OrderClientProps> = ({ data }) => {
    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage orders for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/orders/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
            <Separator />
            <DataTable searchKey="buyer" columns={columns} data={data} />
            <Heading title="API" description="API Calls for Orders" />
      <Separator />
      <ApiList entityName="orders" entityIdName="orderId" />
        </>
    );
};

