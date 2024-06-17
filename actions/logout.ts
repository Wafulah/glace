"use server";

import { signOut } from "@/auth";

export const logout = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    
    body: JSON.stringify({}),
  });

  await signOut();
};
