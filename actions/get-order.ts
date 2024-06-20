import { Order } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getOrder = async (
  store_id: string,
  session_token: string,
  order_id: string
): Promise<Order> => {
  if (!store_id || !session_token || !order_id) {
    throw new Error("Store ID and user session token are required");
  }

  const url = `${API_URL}/${store_id}/orders/${order_id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching order: ${response.statusText}`);
    }

    const order: Order = await response.json();
    return order;
  } catch (error) {
    console.error("[GET_ORDER_ERROR]", error);
    throw error;
  }
};
