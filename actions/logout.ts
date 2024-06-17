"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  await signOut();
  const response = await fetch(
    "https://glace-api-vhkd.onrender.com/api/auth/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({}),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};
