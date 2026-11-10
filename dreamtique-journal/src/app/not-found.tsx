import { PinMark } from "@/components/ui/PinMark";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-svh place-items-center px-6 text-center">
      <div>
        <PinMark className="mx-auto h-24 w-auto" />
        <h1 className="mt-8 text-5xl font-bold tracking-[-0.03em]">This destination is off the map.</h1>
        <p className="mt-4 text-white/70">The page you were looking for does not exist.</p>
        <div className="mt-8"><Button href="/">Back to home</Button></div>
      </div>
    </section>
  );
}
