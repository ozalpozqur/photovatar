import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { Prediction } from "@/types";
import { sleep } from "@/helpers";
import { waitResult } from "@/helpers/server";

const VERSION = {
  MODNET: "dff637aacf67b4f8ec0860f8b9af7d0911cb54f21b6d0b0ca891d06f277127de",
  CODEFORMER: "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { file_url } = req.body;
  const { session_token, userId } = req.cookies;
  // @ts-ignore
  altogic.auth.setSession({ userId, token: session_token });

  const { data, errors } = await altogic.endpoint.post("/prediction", {
    file_url,
    version: VERSION.CODEFORMER,
  });

  if (errors)
    return res.status(500).json({ errors, message: "Something went wrong, please try again" });

  let prediction: Prediction | null = null;

  try {
    prediction = await waitResult(data.id, () => getPrediction(data.id));
    return res.status(200).json(prediction);
  } catch (errors) {
    console.log("catch error \n", JSON.stringify(errors, null, 4));
    return res.status(500).json({ errors, message: "Something went wrong, please try again" });
  }
}

async function getPrediction(predictionId: string) {
  const { data, errors } = await altogic.endpoint.get("/prediction/codeformer", { predictionId });
  if (errors) throw errors;
  return data as Prediction;
}
