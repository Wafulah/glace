import { Customer } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCustomer = async (
  store_id: string,
  jwt_token: string,
  customer_id: string
): Promise<Customer> => {
  if (!store_id || !jwt_token || !customer_id) {
    throw new Error("Store ID and user jwt token are required");
  }

  const url = `${API_URL}/${store_id}/customers/${customer_id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching customer: ${response.statusText}`);
    }

    const customer: Customer = await response.json();
    return customer;
  } catch (error) {
    console.error("[GET_CUSTOMER_ERROR]", error);
    throw error;
  }
};
