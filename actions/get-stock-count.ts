import { getProducts } from "@/actions/get-products";

//isArchived == false
export const getStockCount = async (storeId: string, user_token: string) => {
  const stock = await getProducts(storeId, user_token,false);
  const stockCount = stock.length;

  return stockCount;
};
