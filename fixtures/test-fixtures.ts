import { expect, test as base } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';
import { ResizablePage } from '../pages/ResizablePage';
import { StudentRegistrationPage } from '../pages/StudentRegistrationPage';
import { WebTablesPage } from '../pages/WebTablesPage';

type DemoQaFixtures = {
  webTablesPage: WebTablesPage;
  droppablePage: DroppablePage;
  resizablePage: ResizablePage;
  studentRegistrationPage: StudentRegistrationPage;
};

export const test = base.extend<DemoQaFixtures>({
  webTablesPage: async ({ page }, use) => {
    await use(new WebTablesPage(page));
  },
  droppablePage: async ({ page }, use) => {
    await use(new DroppablePage(page));
  },
  resizablePage: async ({ page }, use) => {
    await use(new ResizablePage(page));
  },
  studentRegistrationPage: async ({ page }, use) => {
    await use(new StudentRegistrationPage(page));
  },
});

export { expect };
