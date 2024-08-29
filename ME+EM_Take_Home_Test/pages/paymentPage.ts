import { Page, expect } from "@playwright/test";
import paymentFormActions from "../sections/paymentForm.section";
import testData from "../testData/deliveryAddress.json";


const formDetails = JSON.parse(JSON.stringify(testData[0])); //  // Use the first object in the array

export default class PaymentPage {
  constructor(public page: Page) {
    this.page = page;
  }

async paymentDetails (page) {
    const form1 = new paymentFormActions(page, 0);
    await form1.enterPaymentDetails()
};

async finalConfirmationOfOrder (page) {
    const confirmationOfOrderPage = page.waitForRequest(request =>
        request.url() === 'https://staging.meandem.vercel.app/checkout/order-confirmation' && request.method() === 'POST',
    );
    await confirmationOfOrderPage;
    await expect(page).toHaveURL(/order-confirmation/);
    const confirmationHeader = this.page.getByRole('heading', { name: 'Thank you for your purchase.' })
    await confirmationHeader.scrollIntoViewIfNeeded()
    await expect(confirmationHeader).toContainText('Thank you for your purchase.')

};

};