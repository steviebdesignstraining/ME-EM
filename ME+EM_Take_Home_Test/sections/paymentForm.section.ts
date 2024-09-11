import { Page } from "@playwright/test";
import testData from "../testData/paymentDetails.json";


export default class PaymentActions {
    page: Page;
    paymentDetails: any;

    constructor(page: Page, index: number = 0) {
        this.page = page;
        this.paymentDetails = JSON.parse(JSON.stringify(testData[index])); // Use the object at the specified index in the array
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
        await this.page.frameLocator('iframe[name="braintree-hosted-field-number"]').getByPlaceholder('0000 0000 0000').click();
        await this.cardNumber();
        await this.expirationDate();
        await this.cvv();
        await this.fullName();
        await this.postcode();
        await this.page.getByRole('button', { name: 'Place Order' }).click()
    }
}