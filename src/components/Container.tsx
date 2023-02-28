import { cn } from "@/helpers";
import { forwardRef, ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode | string;
  as?: keyof JSX.IntrinsicElements;
};

const Container = forwardRef(({ className, children, as }: Props, ref) => {
  const Tag = as ?? "div";
  return (
    // @ts-ignore
    <Tag
      // @ts-ignore
      ref={ref}
      className={cn(
        "relative container mx-auto z-10 max-w-7xl mx-auto px-4 py-5 sm:px-6 sm:py-4 lg:px-8",
        className
      )}
    >
      {children}
    </Tag>
  );
});

Container.displayName = "Container";

export default Container;
