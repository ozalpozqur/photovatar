import { FormEvent, useRef, useState } from "react";
import ShowApiErrors from "@/components/ShowAPIErrors";
import { APIError } from "altogic";
import { useAuth } from "@/store";
import { useRouter } from "next/router";
import type { GetServerSidePropsContext } from "next";
import altogic from "@/libs/altogic";
import Link from "next/link";
import Button from "@/components/Button";
import { http } from "@/helpers";
import type { User } from "@/types";
import Logo from "@/components/Logo";
import Page from "@/components/Page";

function Register() {
  const [errors, setErrors] = useState<APIError>();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { setUser } = useAuth();
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || loading) return;
    setErrors(undefined);
    setLoading(true);

    const data = new FormData(formRef.current);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const name = data.get("name") as string;
    const { user, errors } = await http.post<{ user: User; errors: APIError }>("/api/register", {
      email,
      password,
      name,
    });
    setLoading(false);
    if (errors) {
      setErrors(errors);
      return;
    }
    setUser(user);
    await router.push("/");
  };

  return (
    <Page>
      <div className="min-h-full flex items-center justify-center bg-gray-100">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto bg-white w-full p-10 shadow rounded-lg max-w-full lg:w-[30rem]">
            <div className="flex flex-col items-center justify-center">
              <Logo />
              <h2 className="mt-6 text-2xl lg:text-3xl font-extrabold text-gray-900">
                Create a new account
              </h2>
            </div>
            <div className="mt-8">
              <ShowApiErrors error={errors} />
              <div className="mt-6">
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  method="POST"
                  className="flex flex-col gap-y-1"
                >
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email address</span>
                    </label>
                    <input name="email" type="text" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full name</span>
                    </label>
                    <input name="name" type="text" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <Button full type="submit">
                      Sign up
                    </Button>
                  </div>
                </form>
                <div className="text-center mt-2">
                  <span className="text-stone-600">Already have an account?</span>{" "}
                  <Link className="text-indigo-700 hover:text-indigo-500" href="/auth/login">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Register.displayName = "Register";
export default Register;

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  const { user } = await altogic.auth.getUserFromDBbyCookie(req, res);
  if (user) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
