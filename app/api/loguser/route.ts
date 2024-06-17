import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
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

    try {
      await signIn("credentials", {
        email: user.email,
        name: user.name,
        id: user.sub,
        picture: user.picture,
        redirect: false,
      });
    } catch (error) {
      console.error("Error sign in user:", error);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );

      throw error;
    }

    return Response.redirect(new URL(`https://glace-store.vercel.app/${DEFAULT_LOGIN_REDIRECT}`));
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
