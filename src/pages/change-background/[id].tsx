import Editor from "@/components/Editor";
import Page from "@/components/Page";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { serverSideAltogic } from "@/libs/altogic";
import { PredictionWithAvatar } from "@/types";
import { props, redirect } from "@/helpers";
import { APIError } from "altogic";
import Container from "@/components/Container";

export default function AddNewBackground({
  prediction: predictionFromDB,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <Container>
        <Editor className="-mt-5" prediction={predictionFromDB} />
      </Container>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query as { id: string };

  const { data: prediction, errors } = (await serverSideAltogic()
    .db.model("predictions")
    .lookup({ modelName: "avatars", name: "avatar", query: `this._id == lookup.prediction` })
    .filter(`id == '${id}'`)
    .getSingle()) as { data: PredictionWithAvatar; errors: APIError };

  if (errors) console.log("avatar editor", JSON.stringify(errors, null, 2));

  console.log(prediction);

  if (!prediction) return redirect("/");

  return props({
    prediction,
  });
}
