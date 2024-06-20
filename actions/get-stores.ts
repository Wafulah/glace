import {Store} from "@/types"; 

const API_URL = `${process.env.NEXT_PUBLIC_API_ALL_URL}/stores`;



export const getStores = async (session_token: string): Promise<Store[]> => {
    if (!session_token) {
        throw new Error('User session token is required');
    }

    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${session_token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching stores: ${response.statusText}`);
        }

        const stores: Store[] = await response.json();
        return stores;
    } catch (error) {
        console.error('[GET_STORES_ERROR]', error);
        throw error;
    }
};


