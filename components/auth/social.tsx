"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const fullUrl = DEFAULT_LOGIN_REDIRECT;
  const callbackUrl = `http://localhost:3000${fullUrl}`;
  const onClick = async () => {
    const response = await fetch("http://localhost:8000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ callbackUrl }),
    });

    const { authUrl } = await response.json();
    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={onClick}>
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
