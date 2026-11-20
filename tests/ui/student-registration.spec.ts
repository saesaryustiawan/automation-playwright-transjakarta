import { studentRegistration } from '../../data/test-data';
import { expect, test } from '../../fixtures/test-fixtures';

test.describe('Student Registration Form', { tag: '@regression' }, () => {
  test('submits the form and displays the submitted data', { tag: '@smoke' }, async ({
    studentRegistrationPage,
  }) => {
    await studentRegistrationPage.navigate();
    await studentRegistrationPage.fillAndSubmit(studentRegistration);

    await expect(studentRegistrationPage.confirmationModal).toBeVisible();
    await expect(studentRegistrationPage.confirmationModal).toContainText('Student Name');
    await expect(studentRegistrationPage.confirmationRow('Student Name')).toContainText(
      `${studentRegistration.firstName} ${studentRegistration.lastName}`,
    );
    await expect(studentRegistrationPage.confirmationRow('Student Email')).toContainText(
      studentRegistration.email,
    );
    await expect(studentRegistrationPage.confirmationRow('Gender')).toContainText(
      studentRegistration.gender,
    );
    await expect(studentRegistrationPage.confirmationRow('Mobile')).toContainText(
      studentRegistration.mobile,
    );
    await expect(studentRegistrationPage.confirmationRow('Date of Birth')).toContainText(
      studentRegistration.dateOfBirth.replace(/ (\d{4})$/, ',$1'),
    );
    await expect(studentRegistrationPage.confirmationRow('Subjects')).toContainText(
      studentRegistration.subject,
    );
    await expect(studentRegistrationPage.confirmationRow('Hobbies')).toContainText(
      studentRegistration.hobby,
    );
    await expect(studentRegistrationPage.confirmationRow('Address')).toContainText(
      studentRegistration.address,
    );
    await expect(studentRegistrationPage.confirmationRow('State and City')).toContainText(
      `${studentRegistration.state} ${studentRegistration.city}`,
    );
  });
});
