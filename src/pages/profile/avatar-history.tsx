import { formatDate, props, redirect } from "@/helpers";
import altogic from "@/libs/altogic";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import type { Avatar, PaginateData } from "@/types";
import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import Page from "@/components/Page";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function AvatarHistory({
  avatars,
  paginateData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  async function download(link: string) {
    fetch(link)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = "processed-image.png";
        link.click();
        URL.revokeObjectURL(url);
      });
  }
  return (
    <Page>
      <ProfileLayout>
        {avatars.length === 0 ? (
          <div className="border p-4 flex items-center justify-center rounded-lg text-center md:text-xl text-gray-700">
            You do not have any avatar history.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {avatars.map((avatar) => (
                <article
                  key={avatar._id}
                  className="bg-white border-gray-200 shadow-sm rounded-lg border p-4"
                >
                  <div className="grid grid-cols-1 gap-1 mb-2">
                    <div className="p-1 rounded-lg aspect-square">
                      <img
                        loading="lazy"
                        draggable={false}
                        className="rounded h-full object-cover w-full"
                        src={avatar.avatarURL}
                        alt="original image"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_auto] gap-1">
                    <Button
                      as="link"
                      href={`/change-background/${avatar.prediction.id}`}
                      size="small"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => download(avatar.avatarURL)}
                      size="small"
                    >
                      Download
                    </Button>
                  </div>
                  <div className="mt-1 text-gray-500 text-right">
                    <time className="text-xs" dateTime={avatar.createdAt}>
                      {formatDate(new Date(avatar.createdAt))}
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

  const { data } = await altogic.endpoint.get("/avatar-history?" + searchParams.toString());
  const { avatars, paginateData } = data as {
    avatars: Avatar[];
    paginateData: PaginateData;
  };

  return props({ avatars, paginateData });
}
