import { Page } from "@playwright/test";
import testData from "../testData/prompt.json";

export default class validationPrompt {
    page: Page;
    promptMessage: any;
    // Update the constructor to accept two arguments
    constructor(page: Page, index: number = 0) {
        this.page = page;
        this.promptMessage = JSON.parse(JSON.stringify(testData[index])); // Use the object at the specified index in the array
    }

    // Form Field Selectors and Actions
    // emailAddress = () => this.page.getByTestId('signInOrRegister').getByPlaceholder(' ').fill(this.promptMessage.emailAddress);
    // firstName = () => this.page.getByLabel('First Name*').fill(this.promptMessage.firstName);
    // lastName = () => this.page.getByLabel('Last Name*').fill(this.promptMessage.lastName);
    // phoneNumber = () => this.page.getByLabel('Phone Number*').fill(this.promptMessage.phoneNumber);
    // country = () => this.page.getByLabel('Country*').selectOption(this.promptMessage.country);
    // address = () => this.page.getByLabel('Address Line1*').fill(this.promptMessage.address);
    // countyState = () => this.page.getByLabel('County/State').fill(this.promptMessage.countyState);
    // postcode = () => this.page.getByLabel('Post code*').fill(this.promptMessage.postcode);
    // city = () => this.page.getByLabel('City*').fill(this.promptMessage.city);

    // Actions
    public async enterpromptMessage() {

    }
}
