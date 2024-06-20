import { County } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCounty = async (
  store_id: string,
  session_token: string,
  county_id: string
): Promise<County> => {
  if (!store_id || !session_token || !county_id) {
    throw new Error("Store ID, county_id and user session token are required");
  }

  const url = `${API_URL}/${store_id}/counties/${county_id}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching county: ${response.statusText}`);
    }

    const county: County = await response.json();
    return county;
  } catch (error) {
    console.error("[GET_COUNTY_ERROR]", error);
    throw error;
  }
};
