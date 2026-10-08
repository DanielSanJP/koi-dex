import { describe, expect, it } from "vitest";
import { tintFor, usableTint } from "@/lib/tint";
import koiJson from "../data/koi.json";
import type { Koi } from "@/lib/types";

const koi = koiJson as unknown as Koi[];

describe("usableTint", () => {
  it("passes real hexes through", () => {
    expect(usableTint("#9b4d09")).toBe("#9b4d09");
  });
  it("treats null, empty and #000000 as no tint", () => {
    expect(usableTint(null)).toBeNull();
    expect(usableTint("")).toBeNull();
    expect(usableTint("#000000")).toBeNull();
    expect(usableTint("#00000000")).toBeNull();
  });
});

describe("tintFor", () => {
  it("falls back to the dominant hex per fin", () => {
    const fins = { dominant: "#ff0000", tail: null, dorsal: "#56749a", back: null, side: null };
    expect(tintFor(fins, "tail")).toBe("#ff0000");
    expect(tintFor(fins, "dorsal")).toBe("#56749a");
  });
  it("only Asagi, Shusui, Midorigoi, Ginsui and Kinsui override a fin in the real data", () => {
    const withOverride = koi.filter((k) =>
      (["tail", "dorsal", "back", "side"] as const).some((p) => usableTint(k.fins[p])),
    );
    expect(withOverride.map((k) => k.slug).sort()).toEqual([
      "asagi_koi",
      "ginsui",
      "kinsui",
      "midorigoi",
      "shusui",
    ]);
    expect(tintFor(withOverride[0].fins, "dorsal")).toBe("#56749a");
    const midorigoi = withOverride.find((k) => k.slug === "midorigoi")!;
    expect(tintFor(midorigoi.fins, "dorsal")).toBe("#42702c");
    expect(tintFor(midorigoi.fins, "tail")).toBe("#7abc4a");
    const kinsui = withOverride.find((k) => k.slug === "kinsui")!;
    expect(tintFor(kinsui.fins, "dorsal")).toBe("#e9d4ad");
    expect(tintFor(kinsui.fins, "tail")).toBe("#ff6400");
  });
});
