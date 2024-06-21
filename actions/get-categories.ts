import { Category } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_ALL_URL;

export const getCategories = async (store_id: string, jwt_token: string): Promise<Category[]> => {
    if (!store_id || !jwt_token) {
        throw new Error('Store ID and user jwt token are required');
    }

    const url = `${API_URL}/${store_id}/categories/`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching categories: ${response.statusText}`);
        }

        const categories: Category[] = await response.json();
        return categories;
    } catch (error) {
        console.error('[GET_CATEGORIES_ERROR]', error);
        throw error;
    }
};
