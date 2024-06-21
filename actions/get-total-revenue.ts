import { getOrders } from "@/actions/get-orders";

export const getTotalRevenue = async (storeId: string, jwt_token: string) => {
  //is paid==true
  const paidOrders = await getOrders(storeId, jwt_token);

  const totalRevenue = paidOrders.reduce((total, order) => {
    const orderTotal = order.orderItems.reduce((orderSum, item) => {
      return orderSum + Number(item.product.price);
    }, 0);
    return total + orderTotal;
  }, 0);

  return totalRevenue;
};
