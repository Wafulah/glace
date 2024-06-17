import { AuthError } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react"; // Adjust the import based on your actual auth setup

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

    console.log(user);

    try {
      await signIn("credentials", {
        redirect: false,
        email: user.email,
        name: user.name,
        id: user.sub,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "Failed to sign in" }, { status: 500 });
    }

    return NextResponse.redirect("/settings");
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
