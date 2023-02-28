import { NextApiRequest } from "next";
import formidable, { Fields, Files } from "formidable";
import { Prediction } from "@/types";
import { sleep } from "@/helpers/index";
import axios from "axios";
import sharp from "sharp";
import altogic, { serverSideAltogic } from "@/libs/altogic";
import { APIError } from "altogic";

export function parser(req: NextApiRequest): Promise<{ fields: Fields; files: Files }> {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      return resolve({ fields, files });
    });
  });
}

export function waitResult(id: string, getter: () => Promise<Prediction>): Promise<Prediction> {
  let prediction: Prediction | null = null;
  return new Promise(async (resolve, reject) => {
    while (prediction?.status !== "succeeded") {
      try {
        console.log("Waiting for prediction...");
        prediction = await getter();
        if (["succeeded", "failed", "canceled"].includes(prediction.status))
          return resolve(prediction);
        await sleep(1000);
      } catch (errors) {
        return reject({ errors, message: "Something went wrong, please try again" });
      }
    }
  });
}

export async function createPrediction(version: string, file_url: string) {
  const { data, errors } = await altogic.endpoint.post("/prediction", {
    file_url,
    version,
  });
  if (errors) throw errors;
  return data as Prediction;
}

export async function uploadFile(file: any) {
  const { data, errors } = (await serverSideAltogic()
    .storage.bucket("unprocessed")
    .upload("image", file, {
      isPublic: true,
      onProgress() {},
    })) as { data: { publicPath: string }; errors: APIError };

  if (errors) throw errors;

  return data.publicPath;
}
export async function getCompressedImage(url: string) {
  const imageResponse = await axios({ url, responseType: "stream" });
  const src = imageResponse.data.pipe(sharp()) as sharp.Sharp;

  return src
    .png({
      quality: 60,
      compressionLevel: 9,
    })
    .toBuffer();
}
export async function uploadCompressedImage(buffer: Buffer) {
  const { data, errors } = (await serverSideAltogic()
    .storage.bucket("processed")
    .upload("processed", buffer)) as {
    data: { publicPath: string };
    errors: APIError;
  };

  if (errors) throw errors;
  return data.publicPath;
}
export async function updatePrediction(_id: string, data: Partial<Prediction>) {
  const { data: prediction, errors } = await serverSideAltogic()
    .db.model("predictions")
    .object(_id)
    .update(data);

  if (errors) throw errors;
  return prediction as Prediction;
}
export async function getPrediction(id: string, originalImage: string) {
  const { data, errors } = await altogic.endpoint.post("/get-prediction", { id, originalImage });
  if (errors) throw errors;
  return data as Prediction;
}
