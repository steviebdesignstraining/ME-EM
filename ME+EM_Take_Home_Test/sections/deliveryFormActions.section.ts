import { Page } from "@playwright/test";
import testData from "../testData/deliveryAddress.json";

export default class FormActions {
    page: Page;
    formDetails: any;
    // Update the constructor to accept two arguments
    constructor(page: Page, index: number = 0) {
        this.page = page;
        this.formDetails = JSON.parse(JSON.stringify(testData[index])); // Use the object at the specified index in the array
    }

    // Form Field Selectors and Actions
    emailAddress = () => this.page.getByTestId('signInOrRegister').getByPlaceholder(' ').fill(this.formDetails.emailAddress);
    firstName = () => this.page.getByLabel('First Name*').fill(this.formDetails.firstName);
    lastName = () => this.page.getByLabel('Last Name*').fill(this.formDetails.lastName);
    phoneNumber = () => this.page.getByLabel('Phone Number*').fill(this.formDetails.phoneNumber);
    country = () => this.page.getByLabel('Country*').selectOption(this.formDetails.country);
    address = () => this.page.getByLabel('Address Line1*').fill(this.formDetails.address);
    countyState = () => this.page.getByLabel('County/State').fill(this.formDetails.countyState);
    postcode = () => this.page.getByLabel('Post code*').fill(this.formDetails.postcode);
    city = () => this.page.getByLabel('City*').fill(this.formDetails.city);

    // Actions
    public async enterEmailDetails() {
        console.log('Filling email address...');
        await this.emailAddress();
    }

    public async enterFormDetails() {
        console.log('Filling first name...');
        await this.page.getByLabel('First Name*').scrollIntoViewIfNeeded();
        await this.page.getByLabel('First Name*').click()
        await this.firstName();
        console.log('Filling last name...');
        await this.lastName();
        console.log('Filling phone number...');
        await this.phoneNumber();
        console.log('Selecting country...');
        await this.country();
        console.log('Filling address...');
        await this.address();
        console.log('Filling county/state...');
        await this.countyState();
        console.log('Filling postcode...');
        await this.postcode();
        console.log('Filling city...');
        await this.city();
        await this.page.getByTestId('deliveryAddress').getByRole('button', { name: 'Submit to Continue' }).click({timeout: 30000})
    }
}
