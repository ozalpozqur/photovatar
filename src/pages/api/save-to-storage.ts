import type { NextApiRequest, NextApiResponse } from "next";
import { serverSideAltogic } from "@/libs/altogic";
import formidable from "formidable";
import { readFileSync } from "fs";
import { APIError } from "altogic";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  const { session_token, userId } = req.cookies;

  form.parse(req, async (err, { id }, files) => {
    try {
      // @ts-ignore
      const image = readFileSync(files.image.filepath);
      // @ts-ignore
      serverSideAltogic().auth.setSession({ userId, token: session_token });

      const { data, errors } = (await serverSideAltogic()
        .storage.bucket("avatar")
        .upload("avatar", image, {
          // @ts-ignore
          tags: [userId],
          isPublic: true,
          onProgress() {},
        })) as {
        data: { publicPath: string; _id: string };
        errors: APIError;
      };

      if (errors) {
        return res.status(400).json({ message: "Your picture couldn't uploaded", errors });
      }

      const { data: avatarData } = (await serverSideAltogic()
        .db.model("avatars")
        .object(id as string)
        .get()) as { data: { avatarURL: string } };

      if (avatarData) await serverSideAltogic().storage.deleteFile(avatarData.avatarURL);

      const { errors: avatarErrors } = await serverSideAltogic()
        .db.model("avatars")
        .object(id as string)
        .update({ avatarURL: data.publicPath });

      if (avatarErrors) {
        return res
          .status(400)
          .json({ message: "Your picture couldn't saved", errors: avatarErrors });
      }

      return res.status(200).json(data);
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "Unauthorized", errors: e });
    }
  });
}
