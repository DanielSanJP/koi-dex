import { describe, expect, it } from "vitest";
import { toTsQuery } from "@/lib/search-query";

describe("toTsQuery", () => {
  it("prefix-matches the last word", () => {
    expect(toTsQuery("kohaku bre")).toBe("kohaku & bre:*");
  });
  it("strips characters that could break tsquery syntax", () => {
    expect(toTsQuery("'; drop table plants;--")).toBe("drop & table & plants:*");
    expect(toTsQuery("a & b | !c")).toBe("a & b & c:*");
  });
  it("returns null for nothing usable and caps the word count", () => {
    expect(toTsQuery("   ")).toBeNull();
    expect(toTsQuery("!!!")).toBeNull();
    expect(toTsQuery("a b c d e f g h")?.split(" & ")).toHaveLength(6);
  });
});
