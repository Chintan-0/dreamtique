import { Btn, Label } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="gutter mx-auto flex min-h-[80svh] max-w-[1700px] flex-col justify-center pt-40">
      <Label>Page not found</Label>
      <h1 className="display mt-5 text-[clamp(4rem,14vw,12rem)]">Off the map.</h1>
      <p className="mt-5 max-w-[34ch] text-mute">We could not find that page. Head back home and pick a destination.</p>
      <div className="mt-8">
        <Btn href="/">Back to home</Btn>
      </div>
    </section>
  );
}
