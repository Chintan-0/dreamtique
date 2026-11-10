import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60svh] place-items-center py-20 text-center">
      <div>
        <h1 className="text-5xl font-bold tracking-[-0.03em]">This destination is off the map.</h1>
        <p className="mt-4 text-ink-soft">The page you were looking for does not exist.</p>
        <Link href="/" className="mt-8 inline-flex min-h-[52px] items-center rounded-full bg-brand px-8 font-semibold text-white hover:bg-brand-dark">Back to home</Link>
      </div>
    </section>
  );
}
