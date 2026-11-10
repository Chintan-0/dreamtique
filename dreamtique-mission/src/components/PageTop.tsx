import Image from "next/image";
import { Label } from "./ui";

/** Header of an inner page: a label, a huge title, a lead and one wide photograph. */
export function PageTop({ crumb, title, lead, image, alt }: { crumb: string; title: string; lead: string; image: string; alt: string }) {
  return (
    <section className="pt-40">
      <div className="gutter mx-auto max-w-[1700px]">
        <Label>{crumb}</Label>
        <h1 className="display mt-5 max-w-[10em] text-[clamp(3.4rem,11vw,10rem)]">{title}</h1>
        <p className="mt-6 max-w-[40ch] text-[clamp(1.125rem,1.8vw,1.4rem)] text-mute">{lead}</p>
      </div>
      <div className="gutter mx-auto mt-12 max-w-[1700px]">
        <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[21/9]">
          <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
