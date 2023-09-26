import { motion } from "framer-motion";

export function Terms() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="px-8 md:px-16 lg:px-32 xl:px-48"
    >
      <span>
        By using this service you agree to all of the following terms and
        understand that failure to comply may result in account termination.
      </span>
      <span>
        Any information provided by you or collected automatically in the
        background is used and collected in accordance with our privacy policy.
      </span>
      <span>You recognize account and any data associated with it may be deleted at
      any time for any reason without notice.
      </span>
      You must be 13 years of age or
      older to use this service.
      <span>
        It is up to you to frequently check these terms for any changes. We may
        change these terms at any time without prior notice.
      </span>
    </motion.main>
  );
}
