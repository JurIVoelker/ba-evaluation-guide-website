import { expect, Page } from "@playwright/test";

export const navigateSidebar = async (page: Page, index: number) => {
  const buttons = page.locator('[data-slot="sidebar-menu-button"]');
  await buttons.nth(index).click();
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const task = async (page: Page, group: "A" | "B", index: 1 | 2) => {
  await navigateSidebar(page, index === 1 ? 2 : 3);
  const values = ["Shadcn", "MUI"];
  const title = values[(index + (group === "A" ? 1 : 0)) % 2];
  await expect(page.getByRole("heading", { name: title })).toBeVisible();

  await page.getByRole("button", { name: "Starten" }).click();
  const delaySeconds = 2;
  await sleep(delaySeconds * 1000 + 50);

  await page.getByRole("button", { name: "Pausieren" }).click();
  await page.locator("[data-test-id='finish-task-button']").click();
  await page.getByRole("button", { name: "Bestätigen" }).click();

  await page.waitForSelector(`text=Abgeschlossen in ${delaySeconds} Sekunden`, {
    state: "visible",
  });
};
