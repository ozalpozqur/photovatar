import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/Button";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  close: () => void;
  children?: ReactNode;
};
export default function Modal({ isOpen, close, children }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="modal modal-open">
          <div className="modal-box">
            {children}
            <div className="modal-action justify-center">
              <Button onClick={close}>Close</Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
