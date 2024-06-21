import { getOrders } from "@/actions/get-orders";

// isPaid == true
export const getSalesCount = async (storeId: string, jwt_token: string) => {
  const sales = await getOrders(storeId, jwt_token,true);
  const salesCount = sales.length;

  return salesCount;
};
