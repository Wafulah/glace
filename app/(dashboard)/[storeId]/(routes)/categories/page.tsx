import { Metadata } from "next";
import { format,parseISO } from "date-fns";

import { getCategories } from "@/actions/get-categories";
import { CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";
import { currentUser } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Categories",
};

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const user = await currentUser();
  const categories = await getCategories(params.storeId, user?.jwt_token as string);

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(parseISO(item.createdAt), "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
