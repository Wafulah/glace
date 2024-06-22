"use client";

import { ColumnDef } from "@tanstack/react-table";

export type OrderCol = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  isDelivered: boolean;
  deliveryDate: Date;
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
  isPaid: boolean;
  isDelivered: boolean;
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
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    accessorKey: "isDelivered",
    header: "Delivered",
  },
  {
    accessorKey: "created_at",
    header: "string",
  },
];
