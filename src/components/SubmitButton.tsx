import { getTheme } from "../util/theme";
import { motion } from "motion/react";

export function SubmitButton(props: {
  text: string;
  loading: boolean;
  loadingText: string;
  onClick: () => void;
}) {
  const { accentSecondary } = getTheme();

  return (
    <motion.button
      className={`flex ${
        props.loading ? "cursor-not-allowed" : "cursor-pointer"
      } mt-2 w-full items-center justify-center gap-2 rounded-lg bg-accent-secondary px-4 py-2 font-semibold shadow-lg focus:outline-0`}
      initial={{
        boxShadow: `0px 0px 0px ${accentSecondary}`
      }}
      variants={{
        focus: {
          scale: 1.05,
          boxShadow: `0px 0px 16px ${accentSecondary}`
        }
      }}
      whileHover="focus"
      whileFocus="focus"
      onClick={props.onClick}
    >
      {!props.loading ? (
        props.text
      ) : (
        <span className="flex items-center justify-center gap-3">
          <svg
            className="h-5 w-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{props.loadingText}</span>
        </span>
      )}
    </motion.button>
  );
}
