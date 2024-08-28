import { Page } from "@playwright/test";
import testData from "../testData/paymentDetails.json";

export default class PaymentActions {
    page: Page;
    paymentDetails: any;

    constructor(page: Page) {
        this.page = page;
        this.paymentDetails = JSON.parse(JSON.stringify(testData[0])); // Assuming the first test data object is used
    }

    // Form Field Selectors and Actions
    cardNumber = () => this.page.frameLocator('iframe[name="braintree-hosted-field-number"]').getByPlaceholder('0000 0000 0000').fill(this.paymentDetails.cardNumber);
    expirationDate = () => this.page.frameLocator('iframe[name="braintree-hosted-field-expirationDate"]').getByPlaceholder('MM/YY').fill(this.paymentDetails.expirationDate);
    cvv = () => this.page.frameLocator('iframe[name="braintree-hosted-field-cvv"]').getByPlaceholder('123').fill(this.paymentDetails.cvv);
    fullName = () => this.page.frameLocator('iframe[name="braintree-hosted-field-cardholderName"]').getByPlaceholder('Full name').fill(this.paymentDetails.fullName);
    postcode = () => this.page.frameLocator('iframe[name="braintree-hosted-field-postalCode"]').getByLabel('Postal Code').fill(this.paymentDetails.postcode);

    // Actions
    public async enterPaymentDetails() {
        await this.page.frameLocator('iframe[name="braintree-hosted-field-number"]').getByPlaceholder('0000 0000 0000').scrollIntoViewIfNeeded();
        await this.cardNumber();
        await this.expirationDate();
        await this.cvv();
        await this.fullName();
        await this.postcode();
        await this.page.getByRole('button', { name: 'Place Order' }).click()
    }
}
