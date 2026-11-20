import { expect, test } from '../../fixtures/test-fixtures';

test.describe('Resizable', { tag: '@regression' }, () => {
  test('resizes the element to 400 by 200 pixels', { tag: '@smoke' }, async ({ resizablePage }) => {
    await resizablePage.navigate();
    await resizablePage.resizeTo(400, 200);

    await expect.poll(async () => (await resizablePage.getSize()).width).toBeCloseTo(400, 0);
    await expect.poll(async () => (await resizablePage.getSize()).height).toBeCloseTo(200, 0);
  });
});
