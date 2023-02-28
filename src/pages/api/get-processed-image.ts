import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { Prediction } from "@/types";
import {
  getCompressedImage,
  getPrediction,
  updatePrediction,
  uploadCompressedImage,
  waitResult,
} from "@/helpers/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  altogic.auth.setSession({ token: req.cookies.session_token });
  const { id, originalImage } = req.body;
  let prediction: Prediction | null = null;

  try {
    prediction = await waitResult(id, () => getPrediction(id, originalImage));
    const buffer = await getCompressedImage(prediction.output);
    const output = await uploadCompressedImage(buffer);
    prediction = await updatePrediction(prediction._id, { output });
    console.log("Prediction completed\n", JSON.stringify(prediction, null, 4));
    return res.status(200).json({ prediction });
  } catch (errors) {
    console.log("catch error \n", JSON.stringify(errors, null, 4));
    return res.status(500).json({ errors, message: "Something went wrong, please try again" });
  }
}
