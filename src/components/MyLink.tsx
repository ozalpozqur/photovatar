import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { cn } from "@/helpers";

export default function MyLink({
  children,
  href,
  className,
  onClick,
}: {
  children: ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
}) {
  const { pathname } = useRouter();
  return (
    <Link className={cn(pathname === href && "active", className)} onClick={onClick} href={href}>
      {children}
    </Link>
  );
}
