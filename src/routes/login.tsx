import { Transparent } from "../assets/Transparent";
import { Banner } from "../components/Banner";
import { SubmitButton } from "../components/SubmitButton";
import { motion } from "framer-motion";
import { useState } from "preact/hooks";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(event?: SubmitEvent) {
    if (event) event.preventDefault();
    if (isLoading) return;
    setIsLoading(true);

    const username = document.querySelector<HTMLInputElement>("#username")!;
    const password = document.querySelector<HTMLInputElement>("#password")!;

    if (!username.value || !password.value) {
      setErrorMessage("Please fill out all fields.");
      setIsLoading(false);
      return;
    }

    try {
      const request = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username.value,
          password: btoa(password.value)
        })
      });

      const response = await request.json();

      if (response.success) {
        window.location.href = "/profile";
      } else {
        setErrorMessage(response.message);
        setIsLoading(false);
      }
    } catch {
      setErrorMessage("An unknown error occurred.");
      setIsLoading(false);
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col items-center justify-center gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <div class="w-96">
        <div class="mb-5 flex flex-col items-center gap-2">
          <Transparent class="h-8" />
          <h1 class="text-center text-2xl">Sign in to your account</h1>
        </div>
        <form class="flex flex-col gap-2" onSubmit={handleLogin as any}>
          <div class="flex flex-col gap-2">
            <label for="username">Username or Email</label>
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
            <span class="flex items-center justify-between">
              <label for="password">Password</label>
              <a
                href="/reset"
                class="text-sm underline transition-all hover:text-accent-primary"
              >
                Forgot password?
              </a>
            </span>
            <input
              disabled={isLoading}
              id="password"
              class={`${
                isLoading && "cursor-not-allowed"
              } rounded-md border border-bg-secondary bg-transparent px-2 py-1 text-base font-normal shadow outline-accent-secondary ring-accent-primary transition-all focus:outline-0 focus:ring-2`}
              type="password"
            />
          </div>
          <SubmitButton
            text="Login"
            loadingText="Loading..."
            onClick={handleLogin}
            loading={isLoading}
          />
        </form>

        <div class="mt-2 flex items-center justify-center">
          <a
            href="/register"
            class="text-sm underline transition-all hover:text-accent-primary"
          >
            Don't have an account?
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
