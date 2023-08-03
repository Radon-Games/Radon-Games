import { BareClient } from "@tomphttp/bare-client";

let bareClient: BareClient | undefined;

function setBareClient() {
  const apexHost = location.host.startsWith("www.")
    ? location.host.slice(4)
    : location.host;

  bareClient = new BareClient(
    location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "http://localhost:8080/"
      : `https://uv.${apexHost}/`
  );
}

export async function getObjectURL(url: string | URL) {
  if (!bareClient) {
    setBareClient();
  }

  const request = await bareClient!.fetch(url);
  const blob = await request.blob();

  return URL.createObjectURL(blob);
}

export { bareClient };
