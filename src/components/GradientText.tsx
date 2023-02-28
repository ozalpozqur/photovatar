import { ReactNode } from "react";
import { cn } from "@/helpers";

type GradientTextProps = {
  children: ReactNode;
  className?: string;
  as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "strong" | "small";
};
export default function GradientText({ children, as, className, ...rest }: GradientTextProps) {
  const Tag = as;
  return (
    <Tag
      className={cn(
        "animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent",
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
