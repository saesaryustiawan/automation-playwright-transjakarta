import { type Page } from '@playwright/test';

export async function waitForPageAssets(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));
}
