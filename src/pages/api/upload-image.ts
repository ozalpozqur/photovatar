import type { NextApiRequest, NextApiResponse } from "next";
import altogic from "@/libs/altogic";
import { readFileSync } from "fs";
import { parser, uploadFile } from "@/helpers/server";

const VERSION = {
  MODNET: "dff637aacf67b4f8ec0860f8b9af7d0911cb54f21b6d0b0ca891d06f277127de",
  CODEFORMER: "7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56",
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { session_token, userId } = req.cookies;
  // @ts-ignore
  altogic.auth.setSession({ userId, token: session_token });
  if (!session_token || !userId) return res.status(401).json({ errors: "Unauthorized" });

  try {
    const { files } = await parser(req);
    // @ts-ignore
    const path = await uploadFile(readFileSync(files.image.filepath));
    return res.status(200).json({ path });
  } catch (errors) {
    console.log(errors);
    return res.status(400).json({
      errors,
      message: "Something went wrong, please try again.",
    });
  }
}
