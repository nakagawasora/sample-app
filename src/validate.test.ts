import { describe, expect, test } from "vitest";
import { isValidTitle } from "./validate";

describe("isValidTitle", () => {
  test("普通のタイトルは true", () => {
    expect(isValidTitle("牛乳を買う")).toBe(true);
  });

  test("空文字は false", () => {
    expect(isValidTitle("")).toBe(false);
  });

  test("空白だけは false", () => {
    expect(isValidTitle("   ")).toBe(false);
  });

  test("100文字を超えると false", () => {
    const longTitle = "あ".repeat(101);
    expect(isValidTitle(longTitle)).toBe(false);
  });

  test("100文字ちょうどは true", () => {
    const maxTitle = "あ".repeat(100);
    expect(isValidTitle(maxTitle)).toBe(true);
  });
});
