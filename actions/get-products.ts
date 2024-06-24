import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getProducts = async (
  store_id: string,
  jwt_token: string,
  isArchived?: boolean
): Promise<Product[]> => {
  if (!store_id || !jwt_token) {
    throw new Error("Store ID and user JWT token are required");
  }

  let url = `${API_URL}/${store_id}/products/`;

  if (typeof isArchived === "boolean") {
    url += `?isArchived=${isArchived}`;
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Fetching URL:", url);
    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.statusText}`);
    }

    const products: Product[] = await response.json();
    console.log("Fetched products:", products);
    return products;
  } catch (error) {
    console.error("[GET_PRODUCTS_ERROR]", error);
    throw error;
  }
};
