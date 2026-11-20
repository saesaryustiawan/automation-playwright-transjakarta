import { expect, test } from '../../fixtures/test-fixtures';

test.describe('Droppable', { tag: '@regression' }, () => {
  test('drags the element into the target area', { tag: '@smoke' }, async ({ droppablePage }) => {
    await droppablePage.navigate();
    await droppablePage.dragElementToTarget();

    await expect(droppablePage.dropTarget).toHaveText('Dropped!');
  });
});
