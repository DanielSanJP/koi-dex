import type { NumberCheck } from "@/content/care";

/* Every figure in the care guide, with the two independent sources it was
   checked against. Verdicts are honest: where sources gave a range wider or
   narrower than ours, the row says so and the guide was changed to match. */

const VERDICT: Record<
  NumberCheck["verdict"],
  { label: string; className: string }
> = {
  agree: {
    label: "Both agree",
    className: "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]",
  },
  roughly: {
    label: "Close, range differs",
    className: "border-[#f8a634] bg-[#f8a634]/15 text-[#a86a0f]",
  },
  changed: {
    label: "Changed after checking",
    className: "border-[#93d9f0] bg-[#93d9f0]/30 text-[#1f6b86]",
  },
};

function SourceLink({ s }: { s: { name: string; url: string } }) {
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-black/20 underline-offset-2 hover:text-black hover:decoration-black/60"
    >
      {s.name}
    </a>
  );
}

export default function NumbersTable({ rows }: { rows: NumberCheck[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 text-xs tracking-wide text-black/55 uppercase">
            <th className="px-4 py-3 font-bold">Figure</th>
            <th className="px-4 py-3 font-bold">In the guide</th>
            <th className="px-4 py-3 font-bold">Source A</th>
            <th className="px-4 py-3 font-bold">Source B</th>
            <th className="px-4 py-3 font-bold">Verdict</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const v = VERDICT[r.verdict];
            return (
              <tr
                key={r.figure}
                className="border-b border-black/5 align-top last:border-0"
              >
                <td className="px-4 py-3 font-bold text-black/80">
                  {r.figure}
                </td>
                <td className="px-4 py-3 text-black/70">{r.value}</td>
                <td className="px-4 py-3 text-black/60">
                  <SourceLink s={r.a} />
                </td>
                <td className="px-4 py-3 text-black/60">
                  <SourceLink s={r.b} />
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block rounded-full border px-2 py-0.5 text-xs font-bold whitespace-nowrap ${v.className}`}
                  >
                    {v.label}
                  </span>
                  {r.note && (
                    <p className="mt-1 max-w-[16rem] text-xs text-black/60">
                      {r.note}
                    </p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
