import { Metadata } from "next";
import { currentUser } from "@/lib/auth";

import { getCategory } from "@/actions/get-category";
import { CategoryForm } from "./components/category-form";

export const metadata: Metadata = {
  title: "Category",
};

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  const user =  await currentUser();
  const category = await getCategory(
    params.storeId,
    user?.jwt_token as string,
    params.categoryId
  );
  const jwt_token: string = user?.jwt_token || "";

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm jwt_token={jwt_token} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
