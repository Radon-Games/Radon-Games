import { motion } from "framer-motion";

export function Privacy() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      class="flex flex-col gap-2 px-8 py-16 md:px-16 lg:px-32 xl:px-48"
    >
      <h1 class="text-2xl">Privacy Policy</h1>
      <p class="font-normal tracking-wide">Last updated: September 26, 2023</p>
      <p class="font-normal tracking-wide">
        This Privacy Policy describes how Radon Games ("we," "us," or "our")
        collects, uses, and discloses information, including personal
        information, that you provide to us or that we collect when you visit
        our website. By accessing or using our website, you consent to the
        practices described in this Privacy Policy.
      </p>

      <h2 class="mt-8 text-xl" id="1">
        1. Information We Collect
      </h2>
      <p class="font-normal tracking-wide">
        We may collect various types of information, including but not limited
        to:
      </p>

      <h3 class="mt-2 text-lg" id="1.a">
        a. Information Provided by the User:
      </h3>
      <li class="font-normal tracking-wide">
        Personal Information: We may collect your name, email address, username,
        and passwords when you create an account or interact with our website's
        features.
      </li>

      <h3 class="mt-2 text-lg" id="1.b">
        b. Usage Analytics:
      </h3>
      <li class="font-normal tracking-wide">
        We collect information about your usage of our website, including your
        IP address, browser type, operating system, and pages visited. We use
        cookies and similar technologies for this purpose.
      </li>

      <h3 class="mt-2 text-lg" id="1.c">
        c. Google Analytics and AdSense:
      </h3>
      <li class="font-normal tracking-wide">
        Our website uses Google Analytics and Google AdSense, which may collect
        data about your interactions with our website, including browsing
        behavior and demographic information. This data is collected by Google
        and is subject to Google's Privacy Policy. You can review Google's
        privacy policy at{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          class="underline transition-all hover:text-accent-primary"
        >
          Google Privacy Policy
        </a>
        .
      </li>

      <h2 class="mt-8 text-xl" id="2">
        2. How We Use Your Information
      </h2>
      <p class="font-normal tracking-wide">
        We use the collected information for the following purposes:
      </p>

      <h3 class="mt-2 text-lg" id="2.a">
        a. To Provide and Improve Our Services:
      </h3>
      <li class="font-normal tracking-wide">
        We use your information to operate, maintain, and improve our website,
        services, and user experience.
      </li>

      <h3 class="mt-2 text-lg" id="2.b">
        b. Communication:
      </h3>
      <li class="font-normal tracking-wide">
        We may use your email address to communicate with you, provide updates
        about our services, and respond to your inquiries.
      </li>

      <h3 class="mt-2 text-lg" id="2.c">
        c. Personalization:
      </h3>
      <li class="font-normal tracking-wide">
        We may use information, including usage analytics, to personalize your
        experience and provide you with relevant content and advertisements.
      </li>

      <h3 class="mt-2 text-lg" id="2.d">
        d. Legal Compliance:
      </h3>
      <li class="font-normal tracking-wide">
        We may use your information as necessary to comply with legal
        obligations or protect our rights and interests.
      </li>

      <h2 class="mt-8 text-xl" id="3">
        3. Sharing of Information
      </h2>
      <p class="t font-normal tracking-wide">
        We do not sell or rent your personal information to third parties.
        However, we may share your information under the following
        circumstances:
      </p>

      <h3 class="mt-2 text-lg" id="3.a">
        a. Service Providers:
      </h3>
      <li class="font-normal tracking-wide">
        We may share your information with trusted service providers who assist
        us in operating our website, such as hosting, analytics, and marketing
        services.
      </li>

      <h3 class="mt-2 text-lg" id="3.b">
        b. Legal Requirements:
      </h3>
      <li class="font-normal tracking-wide">
        We may disclose your information to comply with legal obligations,
        respond to requests from law enforcement, or protect our rights and
        interests.
      </li>

      <h2 class="mt-8 text-xl" id="4">
        4. Security
      </h2>
      <p class="font-normal tracking-wide">
        We take reasonable measures to protect your information from
        unauthorized access, use, disclosure, or alteration. However, no method
        of transmission over the internet or electronic storage is completely
        secure, and we cannot guarantee its absolute security.
      </p>

      <h2 class="mt-8 text-xl" id="5">
        5. Your Choices
      </h2>
      <p class="font-normal tracking-wide">
        You can control certain aspects of your information:
      </p>

      <h3 class="mt-2 text-lg" id="5.a">
        a. Account Information:
      </h3>
      <li class="font-normal tracking-wide">
        You can access and update your account information by logging into your
        account settings.
      </li>
      <li class="font-normal tracking-wide">
        You can delete all data associated with your account through the account
        profile.
      </li>

      <h3 class="mt-2 text-lg" id="5.b">
        b. Cookies:
      </h3>
      <li class="font-normal tracking-wide">
        You can manage your cookie preferences through your browser settings.
      </li>

      <h2 class="mt-8 text-xl" id="6">
        6. Children's Privacy
      </h2>
      <p class="font-normal tracking-wide">
        Our website is not directed to individuals under the age of 13, and we
        do not knowingly collect personal information from children under 13
        years of age.
      </p>

      <h3 class="mt-8 text-xl" id="7">
        7. Changes to this Privacy Policy
      </h3>
      <p class="font-normal tracking-wide">
        We may update this Privacy Policy to reflect changes in our practices or
        for other operational, legal, or regulatory reasons. We will notify you
        of any material changes by posting the updated Privacy Policy on our
        website.
      </p>

      <h2 class="mt-8 text-xl" id="8">
        8. Contact Us
      </h2>
      <p class="font-normal tracking-wide">
        If you have any questions or concerns about our Privacy Policy or our
        data practices, please contact us at{" "}
        <a
          href="mailto:contact@radon.games"
          target="_blank"
          class="underline transition-all hover:text-accent-primary"
        >
          contact@radon.games
        </a>
        .
      </p>
      <p class="font-normal tracking-wide">
        By using our website, you agree to the terms of this Privacy Policy. If
        you do not agree with this Privacy Policy, please do not use our
        website.
      </p>
    </motion.main>
  );
}
