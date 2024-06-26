"use client";

import { LuPlus as Plus } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, CustomerColumn } from "./columns";
import { ApiList } from "@/components/ui/api-list";

interface CustomersClientProps {
  data: CustomerColumn[];
}

export const CustomersClient: React.FC<CustomersClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Customers (${data.length})`} description="Manage customers for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/customer/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API Calls for Customers" />
      <Separator />
      <ApiList entityName="customers" entityIdName="customerId" />
    </>
  );
};
