const STAGES = [
  { width: "100%", label: "up to 500,000 eggs from one large female" },
  { width: "78%", label: "fry hatch in 4–7 days" },
  { width: "52%", label: "first cull at 4–6 weeks: deformities and stunted fry" },
  { width: "30%", label: "pattern culls in rounds until about 6 months" },
  { width: "12%", label: "100–200 kept by a professional breeder" },
  { width: "5%", label: "a handful reach show quality, sometimes none" },
];

/** The scale of culling, as a shrinking stack. */
export default function SpawnFunnel() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {STAGES.map((s) => (
        <div
          key={s.label}
          style={{ width: s.width }}
          className="min-w-fit rounded-lg border border-[#49ad6d] bg-[#66dd93]/20 px-3 py-1.5 text-center text-xs font-bold text-[#49ad6d]"
        >
          {s.label}
        </div>
      ))}
    </div>
  );
}
