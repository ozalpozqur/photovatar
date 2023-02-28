import { motion, AnimatePresence } from "framer-motion";
import { APIError } from "altogic";
import { cn } from "@/helpers";

export default function ShowApiErrors({
  error,
  className,
}: {
  className?: string;
  error?: APIError;
}) {
  return (
    <AnimatePresence>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring" }}
          className={cn(
            "bg-red-500 text-left text-sm p-4 text-white rounded min-h-12 flex flex-col rounded-[0.5rem]",
            className
          )}
        >
          {error.items.map((item, index) => (
            <span className="text-[15px]" key={index}>
              {item.message}
            </span>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
