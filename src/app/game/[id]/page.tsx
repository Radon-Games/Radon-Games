import Head from "next/head";
import { notFound } from "next/navigation";

export default function ({ params }: { params: { id: string } }): JSX.Element {
  if (params.id === "a") {
    return notFound();
  }

  return (
    <>
      <Head>
        <title>{params.id} - Radon Games</title>
      </Head>
      t
    </>
  );
}
