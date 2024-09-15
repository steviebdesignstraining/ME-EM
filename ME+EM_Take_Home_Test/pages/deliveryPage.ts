import { Page, expect } from "@playwright/test";
import FormActions from "../sections/deliveryFormActions.section";
import validationPrompt from "../sections/errorPrompt.section";

type CustomEventDetail = {
  type: number;
  ts: number;
  x: number;
  y: number;
  tgt: string;
};

type CustomEventToWaitFor = {
  type: number;
  tgt: string;
};

const eventToWaitFor = {
  type: 6,
  ts: 126234,
  x: 212,
  y: 556,
  tgt: "input#\\:r89\\:-input-Delivery-firstName"
};

export default class DeliveryPage {
  constructor(public page: Page) {
    this.page = page;
  }

  async deliveryForm(page: Page) {
    console.log('Starting the delivery form process...');

    // Wait for and interact with the email field
    await this.page.getByRole('button', { name: 'Continue as guest' }).click();
    console.log('Clicked "Continue as guest" button.');

    const emailField = this.page.getByTestId('signInOrRegister').getByPlaceholder(' ');
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Email field is visible. Clicking...');
    await emailField.click();

    const form1 = new FormActions(page, 0); // index 0 refers to the first object
    await form1.enterEmailDetails();
    console.log('Entered email details.');

    // Click 'Continue to Delivery' button
    const continueButton = this.page.getByRole('button', { name: 'Continue to Delivery' });
    await continueButton.waitFor({ state: 'visible', timeout: 20000 });
    console.log('"Continue to Delivery" button is visible. Clicking...');
    await continueButton.click({timeout: 20000});

    // Wait for the delivery form to appear by waiting for the first field
    console.log('Waiting for the delivery request to complete...');
    const requestPromise = this.page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
        );
    const request = await requestPromise;
    console.log('Request URL:', request.url());

    const formFields = this.page.getByTestId('deliveryAddress');
    await formFields.isEnabled();
    console.log('Delivery form is enabled.');
  }

  async deliveryForm2(page: Page) {
    console.log('Starting the delivery form process (second flow)...');

    // Wait for and interact with the email field
    await this.page.getByRole('button', { name: 'Continue as guest' }).click();
    console.log('Clicked "Continue as guest" button.');

    const emailField = this.page.getByTestId('signInOrRegister').getByPlaceholder(' ');
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Email field is visible. Clicking...');
    await emailField.click();

    const form1 = new FormActions(page, 0); // index 0 refers to the first object
    await form1.enterEmailDetails();
    console.log('Entered email details.');

    // Click 'Continue to Delivery' button
    const continueButton = this.page.getByRole('button', { name: 'Continue to Delivery' });
    await continueButton.waitFor({ state: 'visible', timeout: 20000 });
    console.log('"Continue to Delivery" button is visible. Clicking...');
    await continueButton.click({timeout: 20000});

    await this.page.waitForLoadState('load');
    console.log('Page fully loaded after clicking "Continue to Delivery".');
  }

  async deliveryFormDetails(page: Page) {
    console.log('Starting the form details entry process...');

    await expect(this.page.getByLabel('First Name*')).toBeEnabled();
    console.log('First Name field is enabled.');

    const form1 = new FormActions(page, 0); // index 0 refers to the first object
    await form1.enterFormDetails();
    console.log('Entered delivery form details.');

    // Wait for the delivery form to appear by waiting for the first field
    const requestDeliveryForm = this.page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
    );
    const request = await requestDeliveryForm;
    console.log('Request URL for delivery form details:', request.url());
  }

  async enterInvalidFormDetails(page: Page) {
    console.log('Entering invalid form details...');

    // Fill with the second object in the array
    const form2 = new FormActions(page, 1); // index 1 refers to the second object
    await form2.enterFormDetails();
    console.log('Entered invalid form details.');
  }

  async requestBillingAddress(page: Page) {
    console.log('Requesting billing address...');

    const billingCheckbox = page.locator('#billingAddressUsePrePopulated');
    const isChecked = await billingCheckbox.isChecked();
    console.log('Billing checkbox is checked:', isChecked);

    await this.page.getByRole('button', { name: 'Submit to Continue' }).click();
    console.log('Clicked "Submit to Continue".');

    const requestBillingAddress = page.waitForRequest((request) =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
    );
    const request = await requestBillingAddress;
    console.log('Billing address request URL:', request.url());
  }

  async requestDeliveryMethod(page: Page) {
    console.log('Requesting delivery method...');

    const billingCheckbox = page.locator('#rm_rmt48__2');
    const isChecked = await billingCheckbox.isChecked();
    console.log('Delivery method checkbox is checked:', isChecked);

    await this.page.getByRole('button', { name: 'Submit to Continue' }).click();
    console.log('Clicked "Submit to Continue" for delivery method.');

    const requestDeliveryDetails = page.waitForRequest((request) =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
    );
    const request = await requestDeliveryDetails;
    console.log('Delivery method request URL:', request.url());
  }

  async selectBillingAddress(page: Page) {
    console.log('Selecting billing address...');

    const royalMail = page.locator('#rm_rmt48__2');
    const isChecked = await royalMail.isChecked();
    console.log('Royal Mail checkbox is checked:', isChecked);

    await this.page.getByRole('button', { name: 'Submit to Continue' }).click();
    console.log('Clicked "Submit to Continue" for billing address.');

    const requestPaymentDetails = page.waitForRequest((request) =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
    );
    const request = await requestPaymentDetails;
    console.log('Payment details request URL:', request.url());
  }

  async errorAlert(page: Page) {
    console.log('Validating error alert...');

    const promt = new validationPrompt(page, 0); // index 1 refers to the second object
    await promt.validatePromptMessage();
    console.log('Error alert validation complete.');
  }
}
