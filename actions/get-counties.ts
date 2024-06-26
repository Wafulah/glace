import { parseISO } from "date-fns";
import { County } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCounties = async (
  store_id: string,
  jwt_token: string
): Promise<County[]> => {
  if (!store_id || !jwt_token) {
    throw new Error("Store ID and user jwt token are required");
  }

  const url = `${API_URL}/${store_id}/counties/`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching counties: ${response.statusText}`);
    }

    const counties: County[] = await response.json();

    return counties.map((item: any) => ({
      ...item,
      created_at: parseISO(item.created_at),
      updated_at: parseISO(item.updated_at),
    }));
  } catch (error) {
    console.error("[GET_COUNTIES_ERROR]", error);
    throw error;
  }
};
