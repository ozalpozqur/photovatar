import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await altogic.auth.removeSessionCookie(req, res);

  res.redirect("/");
}
