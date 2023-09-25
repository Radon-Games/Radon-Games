import { Transparent } from "../assets/Transparent";
import { motion } from "framer-motion";
import { useState } from "preact/hooks";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin() {
    setIsLoading(true);
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col items-center justify-center gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <Transparent class="h-8" />
      <h1 class="text-center text-2xl">Sign in to your account</h1>
      <div class="flex flex-col gap-2">
        <label for="username">Username</label>
        <input
          id="username"
          class="rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal outline-accent-secondary ring-accent-primary focus:outline-0 focus:ring-2"
          type="text"
        />
      </div>
      <div class="flex flex-col gap-2">
        <label for="username">Password</label>
        <input
          id="username"
          class="rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal outline-accent-secondary ring-accent-primary focus:outline-0 focus:ring-2"
          type="password"
        />
      </div>
      <motion.div
        class={`flex ${
          isLoading ? "cursor-not-allowed" : "cursor-pointer"
        } curos items-center justify-center gap-2 rounded-lg bg-accent-secondary px-4 py-2 font-semibold shadow-lg`}
        whileHover={{
          scale: 1.05,
          boxShadow: "0px 0px 16px rgb(55 48 163)",
          transition: {
            duration: 0.2
          }
        }}
        onClick={handleLogin}
      >
        {!isLoading ? (
          "Login"
        ) : (
          <span class="flex items-center justify-center gap-3">
            <svg
              class="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Loading...</span>
          </span>
        )}
      </motion.div>

      <div class="flex justify-center">
        <hr class="flex-1 h-[2px] bg-text-secondary"/>
        <span class="px-2">OR</span>
        <hr class="flex-1 h-[2px] bg-text-secondary"/>
      </div>
    </motion.main>
  );
}
