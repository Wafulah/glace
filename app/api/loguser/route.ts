// pages/api/loguser.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { signIn } from "@/auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_token, user_info } = req.query;

  if (!session_token || !user_info) {
    return res.status(400).json({ error: 'Missing session_token or user_info' });
  }

  try {
    const user = JSON.parse(decodeURIComponent(user_info as string));

    await signIn('credentials', {
      user,
    });

    res.redirect('/settings');
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
