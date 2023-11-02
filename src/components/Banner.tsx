import { motion } from "framer-motion";
import { PiXBold } from "react-icons/pi";

export function Banner(props: { message: string; onClose: () => void }) {
  return (
    <motion.div
      class="fixed bottom-0 flex w-full bg-accent-secondary px-2 py-2"
      initial={{
        y: 32
      }}
      animate={{
        y: 0
      }}
    >
      <span class="flex flex-1 items-center justify-center text-sm tracking-wide">
        {props.message}
      </span>
      <div
        class="flex cursor-pointer items-center justify-center"
        onClick={props.onClose}
      >
        <PiXBold />
      </div>
    </motion.div>
  );
}
