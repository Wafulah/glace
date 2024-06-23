import { Order } from "@/types";


const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getOrders = async (
  store_id: string,
  jwt_token: string,
  isPaid?: boolean
): Promise<Order[]> => {
  if (!store_id || !jwt_token) {
    throw new Error("Store ID and user jwt token are required");
  }

  let url = `${API_URL}/${store_id}/orders/`;
  if (typeof isPaid === "boolean") {
    url += `?isPaid=${isPaid}`;
  }
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching orders: ${response.statusText}`);
    }

    const orders: Order[] = await response.json();
    return orders;
  } catch (error) {
    console.error("[GET_ORDERS_ERROR]", error);
    throw error;
  }
};
