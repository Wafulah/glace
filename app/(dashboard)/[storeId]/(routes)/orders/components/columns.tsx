"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  customer: string;
  is_paid: boolean;
  is_delivered: boolean;
  totalPrice: string;
  products: string;
  created_at: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "is_delivered",
    header: "Delivered",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
