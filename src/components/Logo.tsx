import Link from "next/link";

export default function ({ link = "/" }: { link?: string }) {
  return (
    <Link href={link}>
      <img
        className="h-8 w-[163px] md:w-[204px] md:h-10"
        src="/photovatar-logo-b.webp"
        alt="photovatar.com"
      />
    </Link>
  );
}
