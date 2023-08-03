type Props = {
  name: string;
  children: React.ReactNode;
};

export default function Section({ name, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-5 px-6 pt-8 transition-all sm:px-8 md:px-16 lg:px-32">
      <h1 className="text-2xl">{name}</h1>

      <div className="flex w-full flex-col gap-2 rounded-lg bg-background-secondary p-5 shadow-lg">
        {children}
      </div>
    </div>
  );
}
