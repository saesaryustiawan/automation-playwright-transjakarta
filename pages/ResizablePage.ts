import { type Locator, type Page } from '@playwright/test';
import { applicationPaths } from '../data/test-data';
import { waitForPageAssets } from './page-readiness';

// Handles actions and box size on the Resizable page.
export class ResizablePage {
  readonly resizableBox: Locator;
  readonly resizeHandle: Locator;

  constructor(private readonly page: Page) {
    this.resizableBox = page.locator('#resizableBoxWithRestriction');
    this.resizeHandle = this.resizableBox.locator('.react-resizable-handle');
  }

  async navigate(): Promise<void> {
    await this.page.goto(applicationPaths.resizable);
    await waitForPageAssets(this.page);
  }

  async resizeTo(width: number, height: number): Promise<void> {
    for (let attempt = 0; attempt < 3; attempt += 1) {
      const currentSize = await this.resizableBox.boundingBox();
      const handle = await this.resizeHandle.boundingBox();
      if (!currentSize || !handle) {
        throw new Error('Could not locate and measure the resizable box.');
      }

      const widthDelta = width - currentSize.width;
      const heightDelta = height - currentSize.height;
      if (Math.abs(widthDelta) < 0.5 && Math.abs(heightDelta) < 0.5) {
        return;
      }

      const startX = handle.x + handle.width / 2;
      const startY = handle.y + handle.height / 2;
      await this.page.mouse.move(startX, startY);
      await this.page.mouse.down();
      await this.page.mouse.move(startX + widthDelta, startY + heightDelta, { steps: 20 });
      await this.page.mouse.up();
    }

    const finalSize = await this.getSize();
    if (Math.abs(finalSize.width - width) >= 0.5 || Math.abs(finalSize.height - height) >= 0.5) {
      throw new Error(
        `Could not resize the box to ${width}x${height}px; its final size is ${finalSize.width}x${finalSize.height}px.`,
      );
    }
  }

  async getSize(): Promise<{ width: number; height: number }> {
    const box = await this.resizableBox.boundingBox();
    if (!box) {
      throw new Error('Could not measure the resizable box.');
    }

    return { width: box.width, height: box.height };
  }
}
