import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCategory = async (
  store_id: string,
  session_token: string,
  category_id: string
): Promise<Category> => {
  if (!store_id || !session_token) {
    throw new Error("Store ID and user session token are required");
  }

  const url = `${API_URL}/${store_id}/categories/${category_id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching category: ${response.statusText}`);
    }

    const category: Category = await response.json();
    return category;
  } catch (error) {
    console.error("[GET_CATEGORY_ERROR]", error);
    throw error;
  }
};
