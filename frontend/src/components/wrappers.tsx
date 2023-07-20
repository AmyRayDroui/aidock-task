export function WrapperLarge({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  style?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`
      w-full max-w-screen-2xl grid px-4 md:px-20 2xl:px-14 py-8 md:py-14 mx-auto ${className}`}
    >
      {children}
    </section>
  );
}
