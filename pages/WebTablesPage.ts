import { type Locator, type Page } from '@playwright/test';
import { applicationPaths } from '../data/test-data';

export type WebTableUser = {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  salary: string;
  department: string;
};

// Handles adding and checking table data.
export class WebTablesPage {
  readonly addButton: Locator;
  readonly userForm: Locator;
  readonly tableRows: Locator;

  constructor(private readonly page: Page) {
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.userForm = page.locator('#registration-form-modal');
    this.tableRows = page.getByRole('row');
  }

  async navigate(): Promise<void> {
    await this.page.goto(applicationPaths.webTables);
  }

  async addUser(user: WebTableUser): Promise<void> {
    await this.addButton.click();
    // Wait for the form before entering data.
    await this.userForm.waitFor({ state: 'visible' });
    await this.page.locator('#firstName').fill(user.firstName);
    await this.page.locator('#lastName').fill(user.lastName);
    await this.page.locator('#userEmail').fill(user.email);
    await this.page.locator('#age').fill(user.age);
    await this.page.locator('#salary').fill(user.salary);
    await this.page.locator('#department').fill(user.department);
    await this.page.locator('#submit').click();
    // Wait for the save before opening the next form.
    await this.userForm.waitFor({ state: 'hidden' });
    await this.rowForEmail(user.email).waitFor({ state: 'visible' });
  }

  rowForEmail(email: string): Locator {
    return this.tableRows.filter({ hasText: email });
  }
}
