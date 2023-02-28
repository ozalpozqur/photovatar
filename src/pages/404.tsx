import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex items-center p-16">
      <div className="flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
          <p className="mt-4 mb-8">
            But don't worry, you can find plenty of other things on our homepage.
          </p>
          <Link href="/" className="px-8 py-3 font-semibold rounded">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
