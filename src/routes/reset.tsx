import { Transparent } from "../assets/Transparent";
import { Banner } from "../components/Banner";
import { SubmitButton } from "../components/SubmitButton";
import { motion } from "framer-motion";
import { useState } from "preact/hooks";

export function Reset() {
  const [isLoading, setIsLoading] = useState(false);
  const [verficationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleReset(event?: SubmitEvent) {
    if (event) event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col items-center justify-center gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <div class={`w-96 ${!verficationSent && "hidden"}`}>
        <div class="mb-5 flex flex-col items-center gap-2">
          <Transparent class="h-8" />
          <h1 class="text-center text-2xl">Reset Link Sent</h1>
          <p class="font-regular text-center text-sm">
            Please check your inbox for a link to reset your password.
          </p>
        </div>
      </div>
      <div class={`w-96 ${verficationSent && "hidden"}`}>
        <div class="mb-5 flex flex-col items-center gap-2">
          <Transparent class="h-8" />
          <h1 class="text-center text-2xl">Reset your password</h1>
        </div>
        <form class="flex flex-col gap-2" onSubmit={handleReset as any}>
          <div class="flex flex-col gap-2">
            <label for="email">Email</label>
            <input
              disabled={isLoading}
              id="email"
              class={`${
                isLoading && "cursor-not-allowed"
              } rounded-md  border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2`}
              type="email"
            />
          </div>

          <SubmitButton
            text="Continue"
            loadingText="Loading..."
            onClick={handleReset}
            loading={isLoading}
          />
        </form>

        <div class="mt-2 flex items-center justify-center">
          <a
            href="/login"
            class="text-sm underline transition-all hover:text-accent-primary"
          >
            Login instead?
          </a>
        </div>
      </div>

      {errorMessage && (
        <Banner
          message={errorMessage}
          onClose={() => {
            setErrorMessage("");
          }}
        />
      )}
    </motion.main>
  );
}
