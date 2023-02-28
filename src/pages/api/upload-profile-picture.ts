import type { NextApiRequest, NextApiResponse } from "next";
import { serverSideAltogic } from "@/libs/altogic";
import formidable from "formidable";
import { readFileSync } from "fs";
import { User } from "@/types";
import { APIError } from "altogic";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();
  const { session_token } = req.cookies;
  // @ts-ignore
  serverSideAltogic().auth.setSession({ token: session_token });

  form.parse(req, async (err, fields, files) => {
    try {
      const user = await getUser(req, res);

      // @ts-ignore
      const image = readFileSync(files.image.filepath);

      const { data, errors } = (await serverSideAltogic().storage.root.upload(
        "profile-picture",
        image
      )) as {
        data: { publicPath: string };
        errors: APIError;
      };

      if (errors) {
        return res.status(400).json({ message: "Your picture couldn't uploaded" });
      }

      const { data: updatedUser, errors: userErrors } = await serverSideAltogic()
        .db.model("users")
        .object(user._id)
        .update({ profilePicture: data.publicPath });

      if (userErrors) {
        return res.status(400).json({ message: "Your picture couldn't updated" });
      }
      return res.status(200).json(updatedUser);
    } catch (e) {
      console.error(e);
      res.status(401).json({ message: "Unauthorized" });
    }
  });
}

async function getUser(req: any, res: any) {
  const { user, errors } = await serverSideAltogic().auth.getUserFromDBbyCookie(req, res);
  if (!user) {
    throw new Error("User not found");
  }
  return user as User;
}
