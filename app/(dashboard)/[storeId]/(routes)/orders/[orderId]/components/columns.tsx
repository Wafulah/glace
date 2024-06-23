"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderCol = {
  id: string;
  phone: string;
  address: string;
  is_paid: boolean;
  is_delivered: boolean;
  delivery_date: Date;
  created_at: string;
  products: {
    name: string;
    price: string;
    quantity: string;
    totalPrice: string;
  }[];
};

export type Col = {
  name: string;
  price: string;
  quantity: string;
  totalPrice: string;
};

export type AddressCol = {
  phone: string;
  address: string;
  is_paid: boolean;
  is_delivered: boolean;
  created_at: string;
};

export const columns: ColumnDef<Col>[] = [
  {
    accessorKey: "name",
    header: "Products",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
  },
];

export const Addresscolumns: ColumnDef<AddressCol>[] = [
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "is_paid",
    header: "Paid",
  },
  {
    accessorKey: "is_delivered",
    header: "Delivered",
  },
  {
    accessorKey: "created_at",
    header: "string",
  },
];
