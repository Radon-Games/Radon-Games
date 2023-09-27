import { motion } from "framer-motion";

export function Terms() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col gap-2 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <h1 class="text-2xl">1. Terms</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          By using this service, you agree that you are agreeing to all of the
          terms and conditions written below and the{" "}
          <a
            href="privacy"
            class="underline transition-all hover:text-accent-primary"
          >
            Privacy Policy
          </a>
          . If you disagree with any of these terms, you are prohibited from
          using or accessing this service.
        </span>
        <span>
          We reserve the right to modify these terms at any time without prior
          notice.
        </span>
      </div>

      <h1 class="text-2xl">2. Age</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          You must be 13 years of age or older to use this service. By using
          this service, you warrant that you are at least 13 years of age.
        </span>
        <span>
          If you are under the age of 13, you may not use this service.
        </span>
      </div>

      <h1 class="text-2xl">3. Account</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          You are responsible for maintaining the security of your account and
          any associated data.
        </span>
        <span>
          You are responsible for any activity that occurs under your account.
        </span>
        <span>
          We reserve the right to delete your account and any data associated
          with it at any time for any reason without notice.
        </span>
        <span>
          Any information provided by you or collected automatically in the
          background is used and collected in accordance with our{" "}
          <a
            href="privacy"
            class="underline transition-all hover:text-accent-primary"
          >
            Privacy Policy
          </a>
          .
        </span>
      </div>

      <h1 class="text-2xl">4. Content</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          You agree not to post any content that is illegal, harmful,
          threatening, abusive, harassing, defamatory, vulgar, obscene,
          libelous, hateful, or racially, ethnically or otherwise objectionable.
        </span>
        <span>
          You agree not to post any content that contains any computer viruses,
          worms, or any software intended to damage or alter a computer system
          or data.
        </span>
        <span>
          You agree not to post any content that infringes on any patent,
          trademark, trade secret, copyright,{" "}
          <a
            href="https://www.wipo.int/treaties/en/ip/berne/"
            class="transtion-all underline hover:text-accent-primary"
          >
            Berne Convention
          </a>
          , or other proprietary rights of any party.
        </span>
        <span>
          You agree not to post any content that contains any private or
          personal information of any party.
        </span>
        <span>
          You agree not to post any content that contains any advertisements,
          promotions, or solicitations.
        </span>
        <span>
          You agree not to post any content that is unrelated to the topic.
        </span>
        <span>You agree not to post any content that is not in English.</span>
      </div>

      <h1 class="text-2xl">5. Moderation</h1>
      <div class="mb-3 flex flex-col gap-2">
        <div class="mb-3 flex flex-col gap-2">
          <span>
            We reserve the right to remove any content for any reason without
            notice.
          </span>
        </div>
      </div>

      <h1 class="text-2xl">6. Termination</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          We reserve the right to terminate your access to this service at any
          time for any reason without notice.
        </span>
      </div>

      <h1 class="text-2xl">7. Disclaimer</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          This service is provided "as is" and we do not warrant that it will be
          available at all times or that it will be completely free of bugs or
          errors.
        </span>
        <span>We are not responsible for any content posted by any user.</span>
        <span>
          We are not responsible for any content that is linked to by this
          service.
        </span>
      </div>

      <h1 class="text-2xl">8. Limitation of Liability</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          In no event shall we be liable for any damages (including, without
          limitation, damages for loss of data or profit, or due to business
          interruption) arising out of the use or inability to use this service,
          even if we have been notified orally or in writing of the possibility
          of such damage.
        </span>
      </div>

      <h1 class="text-2xl">9. Indemnification</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          You agree to indemnify and hold us harmless from any claim or demand,
          including reasonable attorneys' fees, made by any third party due to
          or arising out of your use of this service, your violation of these
          terms, or your violation of any rights of another party.
        </span>
      </div>

      <h1 class="text-2xl">10. Dispute Resolution</h1>
      <div class="mb-3 flex flex-col gap-2">
        <span>
          You agree to resolve any dispute with us through binding arbitration
          rather than in court. Disputes can be submitted to{" "}
          <a
            href="mailto:disputes@radon.games"
            class="underline transition-all hover:text-accent-primary"
          >
            disputes@radon.games
          </a>
          .
        </span>
      </div>
    </motion.main>
  );
}
