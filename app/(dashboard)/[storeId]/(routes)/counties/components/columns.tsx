"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CountyColumn = {
  id: string
  name: string;
  created_at: string;
}

export const columns: ColumnDef<CountyColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
    {
    accessorKey: "created_at",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];
