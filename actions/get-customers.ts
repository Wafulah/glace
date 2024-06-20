import { Customer } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCustomers = async (
  store_id: string,
  session_token: string
): Promise<Customer[]> => {
  if (!store_id || !session_token) {
    throw new Error("Store ID and user session token are required");
  }

  const url = `${API_URL}/${store_id}/customers`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching customers: ${response.statusText}`);
    }

    const customers: Customer[] = await response.json();
    return customers;
  } catch (error) {
    console.error("[GET_CUSTOMERS_ERROR]", error);
    throw error;
  }
};
