import { motion } from "motion/react";
import { PiXBold } from "react-icons/pi";

export function Banner(props: { message: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed bottom-0 flex w-full bg-accent-secondary px-2 py-2"
      initial={{
        y: 32
      }}
      animate={{
        y: 0
      }}
    >
      <span className="flex flex-1 items-center justify-center text-sm tracking-wide">
        {props.message}
      </span>
      <div
        className="flex cursor-pointer items-center justify-center"
        onClick={props.onClose}
      >
        <PiXBold />
      </div>
    </motion.div>
  );
}
