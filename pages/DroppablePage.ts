import { expect, type Locator, type Page } from '@playwright/test';
import { applicationPaths } from '../data/test-data';
import { waitForPageAssets } from './page-readiness';

// Handles actions on the Droppable page.
export class DroppablePage {
  readonly draggable: Locator;
  readonly dropTarget: Locator;

  constructor(private readonly page: Page) {
    this.draggable = page.locator('#droppableExample-tabpane-simple #draggable');
    this.dropTarget = page.locator('#droppableExample-tabpane-simple #droppable');
  }

  async navigate(): Promise<void> {
    await this.page.goto(applicationPaths.droppable);
    await waitForPageAssets(this.page);
  }

  async dragElementToTarget(): Promise<void> {
    await expect(this.dropTarget).toHaveClass(/ui-droppable/);

    const source = await this.draggable.boundingBox();
    const target = await this.dropTarget.boundingBox();
    if (!source || !target) {
      throw new Error('Could not locate the draggable element or its drop target.');
    }

    await this.page.mouse.move(source.x + 5, source.y + 5);
    await this.page.mouse.down();
    await this.page.mouse.move(target.x + target.width / 2, target.y + target.height / 2, {
      steps: 20,
    });
    await this.page.mouse.up();
  }
}
