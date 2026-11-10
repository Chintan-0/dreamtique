// Review bar for comparing the design options. Remove before launch.
const options = [
  { n: 1, label: "Pin, Next.js", href: process.env.NEXT_PUBLIC_OPTION_1 ?? "http://localhost:3100/" },
  { n: 2, label: "Cinematic", href: process.env.NEXT_PUBLIC_OPTION_2 ?? "http://localhost:3200/" },
  { n: 3, label: "Marketplace", href: process.env.NEXT_PUBLIC_OPTION_3 ?? "http://localhost:3300/" },
  { n: 4, label: "Mission", href: process.env.NEXT_PUBLIC_OPTION_4 ?? "http://localhost:3600/" },
];

export function OptionSwitcher({ current }: { current: number }) {
  return (
    <nav aria-label="Design options" className="fixed inset-x-0 top-0 z-[70] h-9 bg-[#02060f] text-[0.875rem] text-white">
      <div className="mx-auto flex h-full max-w-[1500px] items-center gap-3 overflow-x-auto px-4 [scrollbar-width:none]">
        <span className="shrink-0 font-medium text-white/60">Design options</span>
        {options.map((o) => (
          <a
            key={o.n}
            href={o.href}
            aria-current={o.n === current ? "page" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-0.5 font-medium transition-colors ${o.n === current ? "bg-white text-[#02060f]" : "bg-white/10 hover:bg-white/20"}`}
          >
            {o.n} · {o.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
