/** Travel documents with entry stamps, drawn in code. */
export function Passport({ className = "" }: { className?: string }) {
  return (
    <div role="img" aria-label="Travel documents with entry stamps" className={`relative overflow-hidden bg-mist ${className}`}>
      <svg viewBox="0 0 400 300" className="size-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <rect width="400" height="300" fill="#f3f5f8" />
        <rect x="80" y="26" width="240" height="248" fill="#fff" stroke="#dde1e8" />
        {[
          { cx: 150, cy: 100, t: "DXB", c: "#d4202c", r: -9 },
          { cx: 248, cy: 134, t: "TBS", c: "#0b0d12", r: 8 },
          { cx: 168, cy: 200, t: "EVN", c: "#565d6b", r: -4 },
        ].map((s) => (
          <g key={s.t} transform={`rotate(${s.r} ${s.cx} ${s.cy})`}>
            <circle cx={s.cx} cy={s.cy} r="44" fill="none" stroke={s.c} strokeWidth="4" />
            <circle cx={s.cx} cy={s.cy} r="36" fill="none" stroke={s.c} strokeWidth="1.5" />
            <text x={s.cx} y={s.cy + 9} textAnchor="middle" fontSize="26" fontWeight="700" fill={s.c} fontFamily="Barlow Condensed, sans-serif">
              {s.t}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
