"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  rating: number;
  category: string;
  created_at: string;
  isArchived: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
