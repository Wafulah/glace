import { Metadata } from "next";
import { useCurrentUser } from "@/hooks/use-current-user";

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
  const user = await useCurrentUser();
  const category = await getCategory(
    params.storeId,
    user?.session_token as string,
    params.categoryId
  );
  const user_token: string = user?.session_token || "";

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm user_token={user_token} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
