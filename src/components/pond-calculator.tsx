"use client";

import { useState } from "react";

/* Pond calculator: volume, stocking, pump size, weekly water change and a
   daily feed estimate, all from the same figures the care guide states
   (3,800 L minimum then ~950 L per koi; whole volume through the filter every
   hour; 10-20 % a week; 1-4 % of body weight a day, ~2 % typical). Purely
   client-side; nothing is stored. */

type Shape = "rect" | "round";

const BANDS = [
  { id: "cold", label: "Below 10 °C", rate: 0, note: "no food" },
  { id: "cool", label: "10–15 °C", rate: 0.005, note: "wheat germ, a few light feeds a week" },
  { id: "mild", label: "16–18 °C", rate: 0.01, note: "wheat germ moving to growth food, once a day" },
  { id: "warm", label: "19–21 °C", rate: 0.015, note: "growth food, once or twice a day" },
  { id: "peak", label: "22–24 °C", rate: 0.02, note: "growth food, two to four small feeds" },
  { id: "hot", label: "25 °C and up", rate: 0.01, note: "less: oxygen is the limit" },
] as const;

const fmt = (n: number, digits = 0) =>
  n.toLocaleString("en-NZ", { maximumFractionDigits: digits });

/** Rough koi weight from length, a cubic length-weight relation
    (about 800 g at 40 cm, 2.7 kg at 60 cm). An estimate for feeding, not a
    scale. */
const weightG = (lengthCm: number) => 0.0125 * lengthCm ** 3;

function Field({
  label,
  unit,
  value,
  onChange,
  min = 0,
  step = 0.1,
}: {
  label: string;
  unit: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-bold text-black/60">
      {label}
      <span className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step={step}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm font-normal text-black/80 outline-none focus:border-[#49ad6d]"
        />
        <span className="w-8 shrink-0 text-black/55">{unit}</span>
      </span>
    </label>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="flex flex-col rounded-xl bg-[#f7f6f9] px-3 py-2">
      <span className="text-[0.65rem] font-bold tracking-wide text-black/55 uppercase">{label}</span>
      <span className="font-pally text-lg font-bold text-black/85">{value}</span>
      {sub && <span className="text-xs text-black/60">{sub}</span>}
    </div>
  );
}

export default function PondCalculator() {
  const [shape, setShape] = useState<Shape>("rect");
  const [length, setLength] = useState(4);
  const [width, setWidth] = useState(3);
  const [diameter, setDiameter] = useState(3.5);
  const [depth, setDepth] = useState(1.2);
  const [koiCount, setKoiCount] = useState(6);
  const [avgLength, setAvgLength] = useState(40);
  const [band, setBand] = useState<(typeof BANDS)[number]["id"]>("peak");

  const safe = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);
  const area =
    shape === "rect"
      ? safe(length) * safe(width)
      : Math.PI * (safe(diameter) / 2) ** 2;
  const litres = area * safe(depth) * 1000;
  const gallons = litres / 3.785;

  const capacity = litres >= 3800 ? Math.floor(litres / 950) : 0;
  const stockingVerdict =
    litres === 0
      ? ""
      : litres < 3800
        ? "Below the practical minimum of 3,800 L for koi at all."
        : safe(koiCount) > capacity
          ? `Overstocked for adults: room for about ${capacity}.`
          : `Fine: room for about ${capacity} adult koi.`;
  const depthVerdict =
    safe(depth) === 0 ? "" : depth < 0.9 ? "Too shallow (0.9 m minimum)." : depth < 1.2 ? "OK; 1.2 m+ where winters freeze." : "Good depth.";

  const bandDef = BANDS.find((b) => b.id === band)!;
  const totalWeightG = safe(koiCount) * weightG(safe(avgLength));
  const foodG = totalWeightG * bandDef.rate;

  const chip = (label: string, active: boolean, onClick: () => void) => (
    <button
      key={label}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs font-bold transition-colors ${
        active
          ? "border-[#49ad6d] bg-[#66dd93]/20 text-[#49ad6d]"
          : "border-black/10 bg-white text-black/60 hover:text-black"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 font-pally font-bold">Your pond</legend>
          <div className="flex gap-2">
            {chip("Rectangular", shape === "rect", () => setShape("rect"))}
            {chip("Round", shape === "round", () => setShape("round"))}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {shape === "rect" ? (
              <>
                <Field label="Length" unit="m" value={length} onChange={setLength} />
                <Field label="Width" unit="m" value={width} onChange={setWidth} />
              </>
            ) : (
              <Field label="Diameter" unit="m" value={diameter} onChange={setDiameter} />
            )}
            <Field label="Average depth" unit="m" value={depth} onChange={setDepth} />
          </div>
        </fieldset>
        <fieldset className="flex flex-col gap-3">
          <legend className="mb-2 font-pally font-bold">Your fish</legend>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Number of koi" unit="" value={koiCount} onChange={setKoiCount} step={1} />
            <Field label="Average length" unit="cm" value={avgLength} onChange={setAvgLength} step={1} />
          </div>
          <div className="flex flex-col gap-1 text-xs font-bold text-black/60">
            Water temperature
            <div className="flex flex-wrap gap-1.5">
              {BANDS.map((b) => chip(b.label, band === b.id, () => setBand(b.id)))}
            </div>
          </div>
        </fieldset>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat
          label="Volume"
          value={`${fmt(litres)} L`}
          sub={`about ${fmt(gallons)} US gal`}
        />
        <Stat
          label="Stocking"
          value={litres >= 3800 ? `~${capacity} adult koi` : "too small"}
          sub={stockingVerdict}
        />
        <Stat label="Depth" value={`${fmt(safe(depth), 2)} m`} sub={depthVerdict} />
        <Stat
          label="Pump, at least"
          value={`${fmt(litres)} L/h`}
          sub="whole volume through the filter every hour"
        />
        <Stat
          label="Weekly water change"
          value={`${fmt(litres * 0.1)}–${fmt(litres * 0.2)} L`}
          sub="10 to 20 per cent, dechlorinated and temperature-matched"
        />
        <Stat
          label="Food per day"
          value={bandDef.rate === 0 ? "none" : `~${fmt(foodG)} g`}
          sub={
            bandDef.rate === 0
              ? bandDef.note
              : `${bandDef.note}; ${fmt(bandDef.rate * 100, 1)} % of an estimated ${fmt(totalWeightG / 1000, 1)} kg of fish`
          }
        />
      </div>
      <p className="text-xs text-black/55">
        Estimates from the figures in this guide. Fish weight is a rough
        length-based estimate; feed only what is eaten in three to five minutes
        and let the fish, the water tests and the season correct the number.
      </p>
    </div>
  );
}
