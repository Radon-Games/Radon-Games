import { Transparent } from "../assets/Transparent";
import { Banner } from "../components/Banner";
import { SubmitButton } from "../components/SubmitButton";
import { motion } from "framer-motion";
import { useState } from "preact/hooks";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [verficationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleRegister() {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      setVerificationSent(true);
    }, 1000);
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
          <h1 class="text-center text-2xl">Verify Email</h1>
          <p class="font-regular text-center text-sm">
            Click the verification link that was sent to your inbox to verify
            your identity. You may close this page.
          </p>
        </div>
      </div>
      <div class={`w-96 ${verficationSent && "hidden"}`}>
        <div class="mb-5 flex flex-col items-center gap-2">
          <Transparent class="h-8" />
          <h1 class="text-center text-2xl">Create an account</h1>
        </div>
        <div class="flex flex-col gap-2">
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
          <div class="flex flex-col gap-2">
            <label for="username">Username</label>
            <input
              disabled={isLoading}
              id="username"
              class={`${
                isLoading && "cursor-not-allowed"
              } rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2`}
              type="text"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="password">Password</label>
            <input
              disabled={isLoading}
              id="password"
              class={`${
                isLoading && "cursor-not-allowed"
              } rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2`}
              type="password"
            />
          </div>
          <div class="flex flex-col gap-2">
            <label for="confPassword">Confirm Password</label>
            <input
              disabled={isLoading}
              id="confPassword"
              class={`${
                isLoading && "cursor-not-allowed"
              } rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2`}
              type="password"
            />
          </div>
          <div class="flex items-center gap-2">
            <input
              disabled={isLoading}
              id="tosConfirm"
              class="checkbox hidden"
              type="checkbox"
            />
            <label class="checkbox" for="tosConfirm"></label>
            <label class="text-sm" for="tosConfirm">
              I agree with the{" "}
              <a class="underline transition-colors hover:text-accent-primary">
                Terms of Service
              </a>
            </label>
          </div>

          <SubmitButton
            text="Register"
            loadingText="Loading..."
            onClick={handleRegister}
            loading={isLoading}
          />
        </div>

        <div class="mt-2 flex items-center justify-center">
          <a
            href="/login"
            class="text-sm underline transition-all hover:text-accent-primary"
          >
            Already have an account?
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
