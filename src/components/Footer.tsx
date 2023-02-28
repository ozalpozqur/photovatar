import Logo from "@/components/Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="flex justify-center">
            <Logo />
          </div>
          <nav className="mt-10 text-sm" aria-label="quick links">
            <div className="-my-1 flex flex-wrap justify-center gap-y-4 gap-x-6">
              <Link
                scroll={false}
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#how-it-works"
              >
                How it works
              </Link>
              <Link
                scroll={false}
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#features"
              >
                Features
              </Link>
              <Link
                scroll={false}
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#testimonials"
              >
                Testimonials
              </Link>
              <Link
                scroll={false}
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#pricing"
              >
                Pricing
              </Link>
              <Link
                scroll={false}
                className="inline-block rounded-lg py-1 px-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/#faqs"
              >
                FAQ
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex justify-center items-center border-t border-slate-400/10 py-10">
          <p className="mt-6 text-sm text-slate-500 sm:mt-0">
            Copyright © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
