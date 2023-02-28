import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { Plan } from "@/types";
import { APIError } from "altogic";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    plans: Plan[];
    errors: APIError | null;
  }>
) {
  const { data, errors } = await altogic.db.model("plans").get();

  res.status(errors ? errors.status : 200).json({
    plans: data as Plan[],
    errors,
  });
}
