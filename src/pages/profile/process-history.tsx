import { formatDate, props, redirect } from "@/helpers";
import altogic from "@/libs/altogic";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { PaginateData, Prediction } from "@/types";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import Page from "@/components/Page";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function ProcessHistory({
  processes,
  paginateData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Page>
      <ProfileLayout>
        {processes.length === 0 ? (
          <div className="border p-4 flex items-center justify-center rounded-lg text-center md:text-xl text-gray-700">
            You do not have any process history.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {processes.map((process) => (
                <article
                  key={process._id}
                  className="bg-white border-gray-200 rounded-lg border p-4"
                >
                  <div className="grid grid-cols-2 gap-1 mb-2">
                    <div className="border p-1 rounded-lg aspect-square">
                      <img
                        loading="lazy"
                        draggable={false}
                        className="rounded h-full object-cover w-full"
                        src={process.originalImage}
                        alt="original image"
                      />
                    </div>
                    <div className="border p-1 rounded-lg aspect-square">
                      <img
                        loading="lazy"
                        draggable={false}
                        className="rounded h-full object-cover w-full"
                        src={process.output}
                        alt="output image"
                      />
                    </div>
                  </div>
                  <div>
                    <Button full as="link" href={`/processed/${process.id}`} size="small">
                      See details
                    </Button>
                  </div>
                  <div className="mt-1 text-gray-500 text-right">
                    <time className="text-xs" dateTime={process.created_at}>
                      {formatDate(new Date(process.created_at))}
                    </time>
                  </div>
                </article>
              ))}
            </div>
            <Pagination paginateData={paginateData} />
          </div>
        )}
      </ProfileLayout>
    </Page>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session_token } = context.req.cookies;
  if (!session_token) return redirect("/");
  // @ts-ignore
  altogic.auth.setSession({ token: session_token });
  const searchParams = new URLSearchParams(context.req.url?.toString().split("?")[1]);
  searchParams.set("limit", "20");

  const { data } = await altogic.endpoint.get("/process-history?" + searchParams.toString());
  const { processes, paginateData } = data as {
    processes: Prediction[];
    paginateData: PaginateData;
  };
  return props({ processes, paginateData });
}
