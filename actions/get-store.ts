// actions/get-store.ts
import { Store } from "@/types";

const API_URL = `${process.env.NEXT_PUBLIC_API_ALL_URL}/stores`;

export const getStore = async (storeid: string, jwt_token: string): Promise<Store> => {
    if (!jwt_token) {
        throw new Error('User jwt token is required');
    }

    const storeUrl = `${API_URL}/${storeid}/`;

    try {
        const response = await fetch(storeUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${jwt_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching store: ${response.statusText}`);
        }

        const store: Store = await response.json();
        return store;
    } catch (error) {
        console.error('[GET_STORE_ERROR]', error);
        throw error;
    }
};
