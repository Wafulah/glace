import { format } from "date-fns";
import { Metadata } from "next";

import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { ProductColumn } from "./components/columns";
import { getProducts } from "@/actions/get-products";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser();

  const products = await getProducts(
    params.storeId,
    user?.session_token as string
  );

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: item.quantity,
    rating: item.rating,
    isArchived: item.isArchived,
    price: item.price,
    category: item.category.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
