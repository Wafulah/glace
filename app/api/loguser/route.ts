import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import { signIn } from "@/auth";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url as string);
  const session_token = searchParams.get("session_token");
  const user_info = searchParams.get("user_info");

  if (!session_token || !user_info) {
    return NextResponse.json(
      { error: "Missing session_token or user_info" },
      { status: 400 }
    );
  }

  try {
    const user = JSON.parse(decodeURIComponent(user_info));

    console.log(user);

    try {
      await signIn("credentials", {
        email: user.email,
        name: user.name,
        id: user.sub,
      });
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }

      throw error;
    }

    redirect("/settings");
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
