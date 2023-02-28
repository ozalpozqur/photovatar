import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { APIError } from "altogic";
import type { User } from "@/types";
import { createPrediction } from "@/helpers/server";

const VERSION = {
  MODNET: "dff637aacf67b4f8ec0860f8b9af7d0911cb54f21b6d0b0ca891d06f277127de",
  CODEFORMER: "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_token, userId } = req.cookies;
  const { image } = req.body;
  // @ts-ignore
  altogic.auth.setSession({ userId, token: session_token });
  const { user } = (await altogic.auth.getUserFromDB()) as { user: User; errors: APIError };

  if (!user) return res.status(401).json({ errors: "Unauthorized" });
  if (user.credit === 0) return res.status(400).json({ errors: "You don't have enough credit" });

  try {
    const data = await createPrediction(VERSION.MODNET, image);
    return res.status(200).json({ predictionId: data.id, originalImage: image });
  } catch (errors) {
    console.log(errors);
    return res.status(400).json({
      errors,
      message: "Something went wrong, please try again.",
    });
  }
}
