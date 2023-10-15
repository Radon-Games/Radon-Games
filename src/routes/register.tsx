import { Transparent } from "../assets/Transparent";
import { Banner } from "../components/Banner";
import { SubmitButton } from "../components/SubmitButton";
import { motion } from "framer-motion";
import { useState } from "preact/hooks";

export function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [verficationSent, setVerificationSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleRegister(event?: SubmitEvent) {
    if (event) event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const email = document.querySelector<HTMLInputElement>("#email")!;
    const username = document.querySelector<HTMLInputElement>("#username")!;
    const password = document.querySelector<HTMLInputElement>("#password")!;
    const confPassword =
      document.querySelector<HTMLInputElement>("#confPassword")!;
    const tosConfirm = document.querySelector<HTMLInputElement>("#tosConfirm")!;

    if (
      !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/.test(
        email.value
      )
    ) {
      setErrorMessage("Invalid email address.");
      setIsLoading(false);
      return;
    }

    if (username.value.length < 3 || username.value.length > 16) {
      setErrorMessage("Username must be between 3 and 16 characters.");
      setIsLoading(false);
      return;
    }

    if (
      !/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=]).{8,}/.test(password.value)
    ) {
      setErrorMessage(
        "Password must be at least 8 characters and contain at least one uppercase letter, number, and symbol."
      );
      setIsLoading(false);
      return;
    }

    if (!password.value || password.value !== confPassword.value) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (!tosConfirm.checked) {
      setErrorMessage(
        "You must agree to the Terms of Service and Privacy Policy."
      );
      setIsLoading(false);
      return;
    }

    try {
      const request = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email.value,
          username: username.value,
          password: password.value,
          tos: tosConfirm.checked
        })
      });

      const response = await request.json();

      if (response.success) {
        setVerificationSent(true);
        setErrorMessage("");
        setIsLoading(false);
        return;
      } else {
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }
    } catch {
      setErrorMessage("An unexpected error occurred.");
      setIsLoading(false);
      return;
    }
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
        <form class="flex flex-col gap-2" onSubmit={handleRegister as any}>
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
              I agree to the{" "}
              <a
                href="/terms"
                class="underline transition-colors hover:text-accent-primary"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                class="underline transition-colors hover:text-accent-primary"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          <SubmitButton
            text="Register"
            loadingText="Loading..."
            onClick={handleRegister}
            loading={isLoading}
          />
        </form>

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
