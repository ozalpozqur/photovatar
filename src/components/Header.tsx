import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/helpers";
import { useAuth, useModalStore } from "@/store";
import { Popover, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";
import MyLink from "@/components/MyLink";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

export default function Header() {
  const userMenu = [
    { name: "Profile", href: "/profile" },
    { name: "Logout", href: "/api/logout" },
  ];
  const { user } = useAuth();
  const { pathname } = useRouter();
  const { setLoginModalIsOpen, setRegisterModalIsOpen } = useModalStore();
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center gap-x-6 lg:gap-x-12">
            <Logo />
            {!pathname.startsWith("/profile") && (
              <div className="hidden md:flex gap-x-2 lg:gap-x-6 overflow-auto">
                <Link
                  scroll={false}
                  className="whitespace-nowrap inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#how-it-works"
                >
                  How it works
                </Link>
                <Link
                  scroll={false}
                  className="whitespace-nowrap inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#features"
                >
                  Features
                </Link>
                <Link
                  scroll={false}
                  className="whitespace-nowrap inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#testimonials"
                >
                  Testimonials
                </Link>
                <Link
                  scroll={false}
                  className="whitespace-nowrap inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#pricing"
                >
                  Pricing
                </Link>
                <Link
                  scroll={false}
                  className="whitespace-nowrap inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="/#faqs"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-x-2 gap-x-2 lg:gap-x-8">
            {user ? (
              <>
                <Popover className="relative">
                  {({ open, close }) => (
                    <>
                      <Popover.Button
                        className={cn(
                          "group inline-flex gap-2 items-center justify-center rounded-full py-2 px-4 text-xs font-semibold focus:outline-none bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100",
                          open && "ring-2 ring-offset-2 ring-blue-600"
                        )}
                      >
                        <span className="text-ellipsis overflow-hidden whitespace-nowrap max-w-[20ch] ">
                          {user?.name}
                        </span>
                        <HiChevronDown
                          className={cn("h-5 w-5", open ? "rotate-180 transform" : "")}
                          aria-hidden="true"
                        />
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="flex flex-col gap-1 p-2">
                            {userMenu.map((item) => (
                              <MyLink
                                key={item.href}
                                onClick={close}
                                className="p-2 hover:bg-gray-100 rounded-md [&.active]:bg-gray-200"
                                href={item.href}
                              >
                                {item.name}
                              </MyLink>
                            ))}
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </>
            ) : (
              <>
                <div>
                  <button
                    onClick={() => setLoginModalIsOpen(true)}
                    className="whitespace-nowrap inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  >
                    Sign in
                  </button>
                </div>
                <button
                  className="whitespace-nowrap group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                  onClick={() => setRegisterModalIsOpen(true)}
                >
                  <span>Get started</span>
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
