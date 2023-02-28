import type { NextApiRequest, NextApiResponse } from "next";
import altogic, { serverSideAltogic } from "@/libs/altogic";
import { Session, User } from "altogic";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { access_token, error, code } = req.query as {
    access_token: string;
    error?: string;
    code?: string;
  };
  let user: User | null = null;
  let session: Session | null = null;

  if (error && code === "email_not_unique") {
    const [email] = error.match(/[^( ]+(?=\))/) as [string];
    const { data, errors } = await serverSideAltogic().endpoint.post("/login-with-email", {
      email,
    });

    if (!errors) {
      user = data.user;
      session = data.session;
    }
  } else {
    const result = await altogic.auth.getAuthGrant(access_token);
    session = result.session;
    user = result.user;
  }

  if (user && session) {
    altogic.auth.setSessionCookie(session.token, req, res);
    altogic.auth.setSession(session);
    return res.redirect("/profile");
  }
  res.redirect("/auth/login");
}
