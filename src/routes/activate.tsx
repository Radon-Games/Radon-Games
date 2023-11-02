import { Banner } from "../components/Banner";
import { motion } from "framer-motion";
import { useEffect, useState } from "preact/hooks";

export function Activate() {
  const [errorMessage, setErrorMessage] = useState("");

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token") ?? "";

  useEffect(() => {
    if (!token) {
      setErrorMessage("Invalid token.");
    }

    (async () => {
      try {
        const request = await fetch("/api/auth/activate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${btoa(token)}`
          }
        });

        const response = await request.json();

        if (response.success) {
          window.location.href = "/login";
        } else {
          setErrorMessage(response.message);
        }
      } catch {
        setErrorMessage("An unknown error occurred.");
      }
    })();
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col items-center justify-center gap-5 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <div class="my-16 flex flex-col items-center justify-center gap-2">
        <h1 class="text-2xl">Account Activation</h1>
        <p>{errorMessage ? "An error occurred." : "Activating account..."}</p>
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
