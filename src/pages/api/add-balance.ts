import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { APIError, User } from "altogic";
import { Plan } from "@/types";

type Data = {
  url: { link: string } | null;
  errors: APIError | null;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { plan } = req.body as { plan: Plan };
  const { session_token } = req.cookies;
  // @ts-ignore
  altogic.auth.setSession({ token: session_token });
  const { data, errors } = await altogic.endpoint.post("/add-balance", plan);
  res.json({ url: data.url, errors });
}
