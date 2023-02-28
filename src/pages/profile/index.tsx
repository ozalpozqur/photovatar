import { useRouter } from "next/router";
import { User } from "@/types";
import { GetServerSidePropsContext } from "next";
import altogic from "@/libs/altogic";
import Modal from "@/components/Modal";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/store";
import { Oval } from "react-loader-spinner";
import { http, cn, props, redirect } from "@/helpers";
import { toast } from "react-toastify";
import Page from "@/components/Page";
import MyDropzone from "@/components/Dropzone";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Index() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(router.query?.payment === "ok");

  useEffect(() => {
    if (router.query?.payment) router.replace({ query: {} });
  }, []);

  return (
    <Page>
      <ProfileLayout>
        <div>
          <div className="grid lg:grid-cols-[220px_1fr] gap-4">
            <ProfileCard />
            <MyDropzone className="w-full h-full" />
          </div>
        </div>
      </ProfileLayout>
      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <h3 className="text-xl text-center font-bold">You credit has been successfully added!</h3>
        <p className="py-4 text-center">
          You can now use your credit to remove background from your images.
        </p>
      </Modal>
    </Page>
  );
}

function ProfileCard() {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();

  async function onFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file, "IMG_8892.jpg");
    try {
      const userFromDB = await http.post<User>("/api/upload-profile-picture", formData);
      setUser(userFromDB);
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong, please try again later");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }
  return (
    <div className="card lg:h-[250px] grid grid-rows-[1fr_auto] w-full order-first border rounded-lg md:order-none bg-base-100 overflow-hidden">
      <div className="group relative">
        {user?.profilePicture ? (
          <div className="w-full h-full overflow-hidden">
            <img
              className="w-full h-full object-cover border-b"
              src={user.profilePicture}
              alt={user.name}
            />
          </div>
        ) : (
          <div className="bg-cyan-600 text-white h-full flex items-center justify-center text-center text-9xl select-none">
            {user?.name?.split(" ").map((n) => n[0])}
          </div>
        )}
        <div
          className={cn(
            "transition absolute bg-black/50 inset-0 flex items-center justify-center",
            loading ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )}
        >
          {loading ? (
            <Oval
              height={80}
              width={80}
              color="#fff"
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#fff"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          ) : (
            <Button htmlFor="profilePicture" size="small" className="select-none" as="label">
              Upload new picture
            </Button>
          )}

          <input
            onChange={onFileSelected}
            type="file"
            className="hidden"
            name="image"
            id="profilePicture"
          />
        </div>
      </div>
      <div className="p-2 flex justify-between">
        <h2 className="text-xs">{user?.name}</h2>
        <div className="text-blue-600 text-xs">Credits: {user?.credit}</div>
      </div>
    </div>
  );
}

Index.displayName = "Profile";

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const { user } = await altogic.auth.getUserFromDBbyCookie(req, res);
  if (!user) return redirect("/auth/login");
  return props({ user: user as User });
}
