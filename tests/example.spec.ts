import { navigateSidebar, task } from "@/lib/tests/selectors";
import { test, expect } from "@playwright/test";
import "dotenv/config";

const user = process.env.TEST_USER || process.env.BASIC_AUTH_USER;
const password = process.env.TEST_PASSWORD || process.env.BASIC_AUTH_PASSWORD;

if (!user || !password) {
  throw new Error(
    "Missing credentials: Please set TEST_USER and TEST_PASSWORD or BASIC_AUTH_USER and BASIC_AUTH_PASSWORD environment variables."
  );
}

const credentials = `${user}:${password}`;

test("should complete task workflow and submit results", async ({ page }) => {
  await page.context().setExtraHTTPHeaders({
    Authorization: `Basic ${Buffer.from(credentials).toString("base64")}`,
  });
  await page.goto(`https://evaluation.voelkerlabs.de`);
  await expect(page.getByRole("heading", { name: "Willkommen" })).toBeVisible();

  await navigateSidebar(page, 1);
  await expect(
    page.getByRole("heading", { name: "Aufsetzen der Umgebung" })
  ).toBeVisible();

  const group = await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem("main-store") || "{}");
    return data.state.group;
  });

  if (group === null || group === undefined) {
    throw new Error("Group is not set in localStorage");
  }

  await task(page, group, 1);
  await task(page, group, 2);

  await navigateSidebar(page, 4);
  await expect(
    page.getByRole("heading", { name: "Ergebnisse Hochladen" })
  ).toBeVisible();

  await page.reload();

  await expect(
    page.getByRole("heading", { name: "Ergebnisse Hochladen" })
  ).toBeVisible();

  await page
    .getByPlaceholder("Id eingeben")
    .fill("A_00000000-0000-1000-a000-000000000000");

  await page.getByRole("button", { name: "Weiter" }).click();
  await expect(page.getByRole("heading", { name: "Fragebogen" })).toBeVisible();

  await page.getByRole("button", { name: "Weiter" }).click();
  await expect(
    page.getByRole("heading", { name: "Vielen Dank für deine Teilnahme!" })
  ).toBeVisible();
});
