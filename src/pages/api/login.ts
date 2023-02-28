import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { APIError, Session, User } from "altogic";

type Data = {
  user: User | null;
  errors: APIError | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email, password } = req.body;

  const { user, session, errors } = await altogic.auth.signInWithEmail(email, password);

  if (user && session) {
    altogic.auth.setSessionCookie(session.token, req, res);
    altogic.auth.setSession(session);
  }

  res.status(errors?.status ?? 200).json({ user, errors });
}
