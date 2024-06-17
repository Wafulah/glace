import { redirect } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "@/auth";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { searchParams } = new URL(req.url as string);
  const session_token = searchParams.get("session_token");
  const user_info = searchParams.get("user_info");

  if (!session_token || !user_info) {
    return res
      .status(400)
      .json({ error: "Missing session_token or user_info" });
  }

  try {
    const user = JSON.parse(decodeURIComponent(user_info));

    await signIn("credentials", {
      user,
    });

    redirect("/settings");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
