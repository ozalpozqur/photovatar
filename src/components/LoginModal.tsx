import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useRef, useState } from "react";
import { http } from "@/helpers";
import { User } from "@/types";
import { APIError } from "altogic";
import { useAuth, useModalStore } from "@/store";
import Button from "@/components/Button";
import ShowApiErrors from "@/components/ShowAPIErrors";
import { useRouter } from "next/router";
import Link from "next/link";
import altogic from "@/libs/altogic";
import LoginWithGoogle from "@/components/LoginWithGoogle";

export default function LoginModal() {
  const [errors, setErrors] = useState<APIError>();
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { loginModalIsOpen, setLoginModalIsOpen, setRegisterModalIsOpen } = useModalStore();
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || loading) return;
    setErrors(undefined);
    setLoading(true);
    try {
      const data = new FormData(formRef.current);
      const email = data.get("email") as string;
      const password = data.get("password") as string;
      const { user } = await http.post<{ user: User; errors: APIError }>("/api/login", {
        email,
        password,
      });
      setUser(user);
      setLoginModalIsOpen(false);
      router.push("/profile");
    } catch ({ status, body: { errors } }) {
      setErrors(errors as APIError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={loginModalIsOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[99999]" onClose={() => setLoginModalIsOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full flex flex-col gap-4 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg divider lg:text-2xl font-medium text-center leading-6 text-gray-900"
                >
                  Log in to your account
                </Dialog.Title>
                <ShowApiErrors error={errors} />
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  method="POST"
                  autoComplete="off"
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
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="mt-4">
                    <Button loading={loading} full type="submit">
                      Sign in
                    </Button>
                  </div>
                  <p className="text-lg divider font-medium text-center leading-6 text-gray-900">
                    Or continue with
                  </p>
                  <LoginWithGoogle />
                </form>
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setLoginModalIsOpen(false);
                      setRegisterModalIsOpen(true);
                    }}
                    className="underline-offset-2 underline text-blue-600"
                  >
                    Sign up
                  </button>
                </p>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
