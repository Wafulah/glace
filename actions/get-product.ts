import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getProduct = async (
  store_id: string,
  jwt_token: string,
  product_id: string
): Promise<Product> => {
  if (!store_id || !jwt_token || !product_id) {
    throw new Error("Store ID and user jwt token are required");
  }

  const url = `${API_URL}/${store_id}/products/${product_id}/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching product: ${response.statusText}`);
    }

    const product: Product = await response.json();
    return product;
  } catch (error) {
    console.error("[GET_PRODUCT_ERROR]", error);
    throw error;
  }
};
