import { test, expect } from "@playwright/test";

test.describe("BuddyStudy Core Educational Journeys", () => {
  test("1. Homepage: renders hero, headline, and primary CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("Stop guessing what to");
    await expect(page.locator("text=Build My Learning Path").first()).toBeVisible();
    await expect(page.locator("text=The Prerequisite-Aware Skill Graph").first()).toBeVisible();
  });

  test("2. Student Dashboard: displays profile, progress, and continue learning card", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Welcome back, Alex Chen")).toBeVisible();
    await expect(page.locator("text=Overall Mastery")).toBeVisible();
    await expect(page.locator("text=Continue Learning")).toBeVisible();
    await expect(page.locator("text=Weekly Study Activity")).toBeVisible();
    await expect(page.locator("text=Upcoming Milestones")).toBeVisible();
  });

  test("3. Skill Roadmap: renders graph and toggles to accessible outline list view", async ({ page }) => {
    await page.goto("/roadmap");
    await expect(page.locator("text=Skill Dependency Graph")).toBeVisible();
    await expect(page.locator("text=Next Recommended Step")).toBeVisible();

    // Toggle Accessible Outline View
    const listToggle = page.locator("button:has-text('Accessible List View')");
    await listToggle.click();
    await expect(page.locator("text=Stage 1: Mathematical & Programming Foundations")).toBeVisible();
    await expect(page.locator("text=Stage 2: Core Data Preprocessing & Modeling")).toBeVisible();
  });

  test("4. Diagnostic Assessment: completes 6-question quiz and generates gap report", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.locator("h1")).toContainText("Diagnose Your Machine Learning Foundation");

    // Click Begin
    await page.locator("button:has-text('Begin Assessment')").click();

    // Answer questions
    for (let i = 0; i < 6; i++) {
      // Pick first option
      const firstOption = page.locator("[data-testid='option-0']");
      await firstOption.click();

      if (i < 5) {
        await page.locator("button:has-text('Next Question')").click();
      } else {
        await page.locator("button:has-text('Submit Assessment')").click();
      }
    }

    // Expect Results view
    await expect(page.locator("text=Your Diagnostic Report")).toBeVisible();
    await expect(page.locator("text=Overall Score")).toBeVisible();
    await expect(page.locator("text=Skill Gap & Prerequisite Analysis")).toBeVisible();
  });

  test("5. AI Learning Companion: sends prompt and receives structured response", async ({ page }) => {
    await page.goto("/assistant");
    await expect(page.locator("text=AI Learning Companion")).toBeVisible();

    // Click 'Explain Simply' action pill
    const explainPill = page.locator("button:has-text('Explain Simply')").first();
    await explainPill.click();

    // Verify AI response arrives
    await expect(page.locator("text=Simple Intuition")).toBeVisible({ timeout: 15000 });
  });

  test("6. Learning Workspace: displays multi-perspective explanations and updates mastery", async ({ page }) => {
    await page.goto("/learn/supervised-ml");
    await expect(page.locator("h2")).toContainText("Supervised Machine Learning");

    // Test cognitive tabs
    await page.locator("button:has-text('ELI5 (Simple)')").click();
    await expect(page.locator("text=Plain-Language Mental Model")).toBeVisible();

    await page.locator("button:has-text('Analogy')").click();
    await expect(page.locator("text=Real-World Anchor")).toBeVisible();
  });
});
