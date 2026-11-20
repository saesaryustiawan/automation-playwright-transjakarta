import { type Locator, type Page } from '@playwright/test';
import { applicationPaths, type StudentRegistrationData } from '../data/test-data';

// Fills the registration form and reads the result.
export class StudentRegistrationPage {
  readonly confirmationModal: Locator;

  constructor(private readonly page: Page) {
    this.confirmationModal = page.locator('.modal-content');
  }

  async navigate(): Promise<void> {
    await this.page.goto(applicationPaths.studentRegistration);
  }

  async fillAndSubmit(data: StudentRegistrationData): Promise<void> {
    await this.page.locator('#firstName').fill(data.firstName);
    await this.page.locator('#lastName').fill(data.lastName);
    await this.page.locator('#userEmail').fill(data.email);
    await this.page.locator(`#gender-radio-${this.genderRadioId(data.gender)} + label`).click();
    await this.page.locator('#userNumber').fill(data.mobile);
    await this.page.locator('#dateOfBirthInput').fill(data.dateOfBirth);

    const subjects = this.page.locator('#subjectsInput');
    await subjects.fill(data.subject);
    await this.page
      .locator('.subjects-auto-complete__option')
      .filter({ hasText: data.subject })
      .click();

    await this.page.locator(`#hobbies-checkbox-${this.hobbyCheckboxId(data.hobby)} + label`).click();
    await this.page.locator('#currentAddress').fill(data.address);

    await this.page.locator('#state').click();
    await this.page.getByText(data.state, { exact: true }).click();
    await this.page.locator('#city').click();
    await this.page.getByText(data.city, { exact: true }).click();
    await this.page.locator('#submit').click();
  }

  confirmationRow(label: string): Locator {
    return this.confirmationModal.locator('tbody tr').filter({ hasText: label });
  }

  private genderRadioId(gender: StudentRegistrationData['gender']): number {
    return { Male: 1, Female: 2, Other: 3 }[gender];
  }

  private hobbyCheckboxId(hobby: StudentRegistrationData['hobby']): number {
    return { Sports: 1, Reading: 2, Music: 3 }[hobby];
  }
}
