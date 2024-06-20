import { Metadata } from "next";

import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

import { ProductForm } from "./components/product-form";
import { getProduct } from "@/actions/get-product";
import { getCategories } from "@/actions/get-categories";

export const metadata: Metadata = {
  title: "Products",
};

const ProductPage = async ({
  params,
}: {
  params: { productId: string; storeId: string };
}) => {
  const user = await currentUser();

  const product = await getProduct(
    params.storeId,
    user?.session_token as string,
    params.productId
  );

  const categories = await getCategories(
    params.storeId,
    user?.session_token as string
  );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          user_token={user?.session_token}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
