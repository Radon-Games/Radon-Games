import { Icon } from "~/assets/Icon";

type NotFoundProps = {
  message: string;
};

export function NotFound({ message }: NotFoundProps) {
  return (
    <main className="flex flex-col px-8 md:px-16 lg:px-32 xl:px-48">
      <section className="my-32 flex w-full flex-col items-center justify-center gap-5">
        <div className="flex items-center justify-center gap-4">
          <Icon className="w-12" />
          <h1 className="text-center text-4xl font-bold">404 Not Found</h1>
        </div>
        <p className="text-center">{message}</p>
        <a
          className="text-center text-sm text-text-secondary underline"
          href="/"
        >
          Return Home
        </a>
      </section>
    </main>
  );
}
