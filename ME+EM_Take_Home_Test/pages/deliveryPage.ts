import { Page, expect } from "@playwright/test";
import FormActions from "../sections/deliveryFormActions.section";
import validationPrompt from "../sections/errorPrompt.section";
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

  async deliveryForm(page) {
    // Wait for and interact with the email field
    await this.page.getByRole('button', { name: 'Continue as guest' }).click()
    const emailField = this.page.getByTestId('signInOrRegister').getByPlaceholder(' ');
    await emailField.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Email field is visible. Clicking...');
    await emailField.click();

    // await this.page.getByTestId('signInOrRegister').getByPlaceholder(' ').fill(formDetails.emailAddress);
    const form1 = new FormActions(page, 0); // index 0 refers to the first object
    await form1.enterEmailDetails();

    // Click 'Continue to Delivery' button
    const continueButton = this.page.getByRole('button', { name: 'Continue to Delivery' });
    await continueButton.waitFor({ state: 'visible', timeout: 20000 });
    console.log('"Continue to Delivery" button is visible. Clicking...');
    await continueButton.click({timeout: 20000});

    // Wait for the delivery form to appear by waiting for the first field
    const requestPromise = this.page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
        );
    const request = await requestPromise;
    // await requestPromise;
    await request;
    console.log(request.url());

    const formFields = this.page.getByTestId('deliveryAddress')
    await formFields.isEnabled();
    }

    async deliveryForm2(page) {
      // Wait for and interact with the email field
      await this.page.getByRole('button', { name: 'Continue as guest' }).click()
      const emailField = this.page.getByTestId('signInOrRegister').getByPlaceholder(' ');
      await emailField.waitFor({ state: 'visible', timeout: 10000 });
      console.log('Email field is visible. Clicking...');
      await emailField.click();
  
      // await this.page.getByTestId('signInOrRegister').getByPlaceholder(' ').fill(formDetails.emailAddress);
      const form1 = new FormActions(page, 0); // index 0 refers to the first object
      await form1.enterEmailDetails();
  
      // Click 'Continue to Delivery' button
      const continueButton = this.page.getByRole('button', { name: 'Continue to Delivery' });
      await continueButton.waitFor({ state: 'visible', timeout: 20000 });
      console.log('"Continue to Delivery" button is visible. Clicking...');
      await continueButton.click({timeout: 20000});

      // await this.waitForCustomEvent(page)
  
      // Wait for the delivery form to appear by waiting for the first field
      // const requestPromise = this.page.waitForRequest(request =>
      //     request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
      //     );
      // const request = await requestPromise;
      // await requestPromise;
      // console.log(request.url())
      await this.page.waitForLoadState('load');
      // console.log(formRequest.url());
      }

  async deliveryFormDetails(page) {     
    // const formFields = this.page.getByTestId('deliveryAddress')
    // await expect(formFields.locator('#:r89:-input-Delivery-firstName')).toBeEnabled();
    await expect(this.page.getByLabel('First Name*')).toBeEnabled
    const form1 = new FormActions(page, 0); // index 0 refers to the first object
    await form1.enterFormDetails();
    // Wait for the delivery form to appear by waiting for the first field
    const requestDeliveryForm = this.page.waitForRequest(request =>
        request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
        );
    const request = await requestDeliveryForm;
    await requestDeliveryForm;
    console.log(request.url());
  }

  async enterInvalidFormDetails(page) {    
    // Fill with the second object in the array
    const form2 = new FormActions(page, 1); // index 1 refers to the second object
    await form2.enterFormDetails();

    // const lastNameError = this.page.getByText('Last Name is required')
    // await expect(lastNameError).toBeVisible()
    // await expect(lastNameError).toContainText('Last Name is required')

    // const postalCodeError = this.page.getByText('Please enter a valid Postcode')
    // await expect(postalCodeError).toBeVisible()
    // await expect(postalCodeError).toContainText('Please enter a valid Postcode')
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
    await request;
    console.log(request.url());
    };

    async requestDeliveryMethod (page) {
        // Locate the radio button or checkbox using its ID, aria-label, or another attribute
        const billingCheckbox = page.locator('#rm_rmt48__2');
    
        // Validate that the checkbox is checked
        const isChecked = await billingCheckbox.isChecked();
        await this.page.getByRole('button', { name: 'Submit to Continue' }).click()
        const requestDeliveryDetails = page.waitForRequest(request =>
            request.url() === 'https://www.sandbox.paypal.com/xoplatform/logger/api/logger?disableSetCookie=true' && request.method() === 'POST',
            );
        const request = await requestDeliveryDetails;
        await request;
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

    async waitForCustomEvent(page) {
      // Expose a function to handle the custom event
      await page.exposeFunction('onCustomEvent', (event) => {
        // Check if the event matches the one we're waiting for
        if (event.type === eventToWaitFor.type && event.tgt === eventToWaitFor.tgt) {
          console.log('Event received:', event);
        }
      });
    
      // Add an event listener on the page that listens for the custom event
      await page.evaluate(() => {
        document.addEventListener('customEvent', (e: any) => {
          const eventData = {
            type: e.detail.type,
            ts: e.detail.ts,
            x: e.detail.x,
            y: e.detail.y,
            tgt: e.detail.tgt,
          };
          // Call the exposed function when the event occurs
          window['onCustomEvent'](eventData);  // Using window['onCustomEvent'] syntax
        });
      });
    }

    async errorAlert (page) {
      const promt = new validationPrompt(page, 0); // index 1 refers to the second object
      await promt.validatePromptMessage();
    }
  
  }
