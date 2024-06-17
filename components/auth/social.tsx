"use client";

import { signIn } from "@/auth";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const Social = () => {
  const fullUrl = DEFAULT_LOGIN_REDIRECT;
  const callbackUrl = `https://glace-store.vercel.app${fullUrl}`;
  const onClick = async () => {
    try {
      const response = await fetch(
        "https://glace-api-vhkd.onrender.com/api/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ callbackUrl }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { access_token, user } = await response.json();
      console.log(access_token, user);
      // Assuming oauth-login is a function you have to handle the login process with AuthJS
      await signIn("credentials", {
        user,
      });

      // Redirect or navigate user after successful login
      // window.location.href = DEFAULT_LOGIN_REDIRECT;
    } catch (error) {
      console.error("Error:", error);
      // Handle error cases
    }
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={onClick}>
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
