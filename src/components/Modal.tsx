import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { PiX } from "react-icons/pi";

type ModalProps = {
  title: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
};

export function Modal(props: ModalProps) {
  return (
    <AnimatePresence mode="wait">
      {props.isOpen && (
        <motion.div
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed right-0 top-0 flex h-screen w-screen flex-col items-center justify-center bg-black bg-opacity-25 p-16"
          onClick={() => {
            props.setIsOpen(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, marginTop: 50 }}
            animate={{ opacity: 1, marginTop: 0 }}
            exit={{ opacity: 0, marginTop: 50 }}
            className="rounded-lg bg-bg-secondary p-8 shadow-lg"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{props.title}</span>
              <button
                aria-label="Close Modal"
                className="rounded-md p-1.5 transition-colors hover:bg-bg-primary"
                onClick={() => {
                  props.setIsOpen(false);
                }}
              >
                <PiX className="text-xl" />
              </button>
            </div>
            <div className="pt-2">{props.children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
