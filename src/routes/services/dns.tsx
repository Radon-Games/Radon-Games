import { Link } from "solid-app-router";

import "../../build.css";

export default function DNS () {
  document.title = "Radon DNS";

  return (
    <>
      <h1 class="text-2xl text-center my-10">Radon DNS</h1>
      <p class="text-center mx-10">
        Radon DNS is a DNS resolver that disables certain school monitoring software by blocking requests from GoGuardian, Securly, and other blocking software.
      </p>
      <h2 class="text-xl text-center my-5">How to use</h2>
      <p class="text-center mx-10">
        To use Radon DNS, you need to change your DNS server to Radon DNS.
      </p>
      <pre class="block mx-auto w-64 my-5 p-2 bg-gray-800 rounded-lg">
        45.33.47.188<br/>
        1.1.1.1
      </pre>
      <h2 class="text-xl text-center my-5">Submiting new URL.</h2>
      <p class="text-center mx-10 mb-16">
        To submit a new URL to be blocked, make a PR on our <Link class="hover:underline" href="https://github.com/Radon-Games/DNS">GitHub</Link>.
      </p>
    </>
  );
}
