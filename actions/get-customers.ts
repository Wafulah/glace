import { Customer } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCustomers = async (
  store_id: string,
  jwt_token: string
): Promise<Customer[]> => {
  if (!store_id || !jwt_token) {
    throw new Error("Store ID and user jwt token are required");
  }

  const url = `${API_URL}/${store_id}/customers/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
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
