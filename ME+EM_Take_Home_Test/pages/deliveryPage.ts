import { Page, expect } from "@playwright/test";
import FormActions from "../sections/deliveryFormActions.section";
import testData from "../testData/deliveryAddress.json";

const formDetails = JSON.parse(JSON.stringify(testData[0])); //  // Use the first object in the array


export default class DeliveryPage {
  constructor(public page: Page) {
    this.page = page;
  }

  async deliveryForm(page) {
    // Wait for and interact with the email field
    await this.page.getByRole('button', { name: 'Continue as guest' }).click()
    const emailField = this.page.getByTestId('signInOrRegister').getByPlaceholder(' ');
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Email field is visible. Clicking...');
    await emailField.click();

    await this.page.getByTestId('signInOrRegister').getByPlaceholder(' ').fill(formDetails.emailAddress);

    // Click 'Continue to Delivery' button
    const continueButton = this.page.getByRole('button', { name: 'Continue to Delivery' });
    await continueButton.waitFor({ state: 'visible', timeout: 20000 });
    console.log('"Continue to Delivery" button is visible. Clicking...');
    await continueButton.click({timeout: 20000});

    // Wait for the delivery form to appear by waiting for the first field
    const requestPromise = page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
        );
    const request = await requestPromise;
    console.log(request.url());
  }


  async deliveryFormDetails(page) {    
    const form = new FormActions(page);
    await form.enterFormDetails()

    // Wait for the delivery form to appear by waiting for the first field
    const requestDeliveryForm = page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
        );
    const request = await requestDeliveryForm;
    console.log(request.url());
  }

  async requestBillingAddress (page) {
    // Locate the radio button or checkbox using its ID, aria-label, or another attribute
    const billingCheckbox = page.locator('#billingAddressUsePrePopulated');

    // Validate that the checkbox is checked
    const isChecked = await billingCheckbox.isChecked();
    await this.page.getByRole('button', { name: 'Submit to Continue' }).click()
    const requestBillingAddress = page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
        );
    const request = await requestBillingAddress;
    console.log(request.url());
    };

    async requestDeliveryMethod (page) {
        // Locate the radio button or checkbox using its ID, aria-label, or another attribute
        const billingCheckbox = page.locator('#rm_rmt48__2');
    
        // Validate that the checkbox is checked
        const isChecked = await billingCheckbox.isChecked();
        await this.page.getByRole('button', { name: 'Submit to Continue' }).click()
        const requestPaymentDetails = page.waitForRequest(request =>
            request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
            );
        const request = await requestPaymentDetails;
        console.log(request.url());
    };

    async selectBillingAddress (page) {
        // Locate the radio button or checkbox using its ID, aria-label, or another attribute
        const royalMail = page.locator('#rm_rmt48__2');
    
        // Validate that the checkbox is checked
        const isChecked = await royalMail.isChecked();
        await this.page.getByRole('button', { name: 'Submit to Continue' }).click()
        const requestPaymentDetails = page.waitForRequest(request =>
            request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
            );
        const request = await requestPaymentDetails;
        console.log(request.url());
    };


}