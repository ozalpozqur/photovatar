import { useRouter } from "next/router";
import { ReactNode } from "react";
import { cn } from "@/helpers";
import Page from "@/components/Page";
import Container from "@/components/Container";
import { SiProcessingfoundation } from "react-icons/si";
import { HiCreditCard, HiLogout } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { TbBrandGravatar } from "react-icons/tb";
import Link from "next/link";

const subNavigation = [
  { name: "Profile", href: "/profile", icon: BiUserCircle },
  { name: "Process History", href: "/profile/process-history", icon: SiProcessingfoundation },
  { name: "Payments History", href: "/profile/payment-history", icon: HiCreditCard },
  { name: "Avatar History", href: "/profile/avatar-history", icon: TbBrandGravatar },
  { name: "Logout", href: "/api/logout", icon: HiLogout },
];

export default function ProfileLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  return (
    <Page>
      <Container className="py-0">
        <div className="grid lg:grid-cols-[1fr_250px] gap-4 mb-32">
          {children}
          <aside className="order-first lg:order-none">
            <nav className="space-y-1 border p-4 rounded-lg">
              {subNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    router.pathname === item.href
                      ? "bg-gray-200 text-blue-600"
                      : "text-gray-900 hover:text-gray-900 hover:bg-gray-200",
                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                  )}
                >
                  <item.icon
                    className={cn(
                      router.pathname === item.href
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      </Container>
    </Page>
  );
}
