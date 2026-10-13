import { describe, it, expect } from "vitest";
import { FAQ_ITEMS } from "../../lib/faq";

describe("FAQ_ITEMS", () => {
  it("has at least 9 entries", () => {
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(9);
  });

  it("every entry has a non-empty question", () => {
    for (const item of FAQ_ITEMS) {
      expect(item.question.trim().length).toBeGreaterThan(0);
    }
  });

  it("every entry has a non-empty answer", () => {
    for (const item of FAQ_ITEMS) {
      expect(item.answer.trim().length).toBeGreaterThan(0);
    }
  });

  it("has unique questions", () => {
    const questions = FAQ_ITEMS.map((i) => i.question);
    const uniqueQuestions = new Set(questions);
    expect(uniqueQuestions.size).toBe(questions.length);
  });
});
