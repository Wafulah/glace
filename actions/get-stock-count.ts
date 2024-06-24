import { getProducts } from "@/actions/get-products";

//isArchived == false
export const getStockCount = async (storeId: string, jwt_token: string) => {
  const stock = await getProducts(storeId, jwt_token,false);
  console.log("stock",stock)
  const stockCount = stock.length;

  return stockCount;
};
