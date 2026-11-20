import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { parseCsv } from '../../data/csv';
import { expect, test } from '../../fixtures/test-fixtures';
import { type WebTableUser } from '../../pages/WebTablesPage';

test.describe('Bulk insert users from CSV', { tag: '@regression' }, () => {
  test('adds every CSV user to the Web Tables grid', { tag: '@smoke' }, async ({ webTablesPage }) => {
    const csv = await readFile(resolve(__dirname, '../../data/web-table-users.csv'), 'utf8');
    const users = parseCsv(csv).map((record, index): WebTableUser => {
      const user = {
        firstName: record.firstName,
        lastName: record.lastName,
        age: record.age,
        email: record.email,
        salary: record.salary,
        department: record.department,
      };

      // Show the row and field when CSV data is missing.
      for (const [field, value] of Object.entries(user)) {
        if (!value) {
          throw new Error(`CSV row ${index + 2} is missing the "${field}" value.`);
        }
      }

      return user;
    });

    await webTablesPage.navigate();
    for (const user of users) {
      await webTablesPage.addUser(user);
    }

    for (const user of users) {
      const row = webTablesPage.rowForEmail(user.email);
      await expect(row).toHaveCount(1);
      await expect(row).toContainText(user.firstName);
      await expect(row).toContainText(user.lastName);
      await expect(row).toContainText(user.age);
      await expect(row).toContainText(user.salary);
      await expect(row).toContainText(user.department);
    }
  });
});
