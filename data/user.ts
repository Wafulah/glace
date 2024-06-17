const BASE_URL = "https://glace-api-vhkd.onrender.com/api/";

export const getUserByEmail = async (email: string) => {
  const url = `${BASE_URL}get-user-by-email/?email=${encodeURIComponent(
    email
  )}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user by email");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  const url = `${BASE_URL}get-user-by-id/?id=${encodeURIComponent(id)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch user by ID");
    }
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};
