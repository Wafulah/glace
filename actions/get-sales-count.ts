import { getOrders } from "@/actions/get-orders";

// isPaid == true
export const getSalesCount = async (storeId: string, user_token: string) => {
  const sales = await getOrders(storeId, user_token,true);
  const salesCount = sales.length;

  return salesCount;
};
