import { Page, expect } from "@playwright/test";
import testData from "../testData/prompt.json";

export default class validationPrompt {
  page: Page;
  promptMessage: any;
  // Update the constructor to accept two arguments
  constructor(page: Page, index: number = 0) {
    this.page = page;
    this.promptMessage = testData[index];
  }

  // Form Field Selectors and Actions
  firstName = () => this.page.getByRole("alert").first();
  postcode = () => this.page.getByRole("alert").nth(1);
  cardNumber = () => this.page.getByRole("alert").first();
  expDate = () => this.page.getByRole("alert").nth(1);
  cvv = () => this.page.getByRole("alert").nth(2);
  // firstName = () => this.page.getByLabel('First Name*').fill(this.promptMessage.firstName);
  // lastName = () => this.page.getByLabel('Last Name*').fill(this.promptMessage.lastName);
  // phoneNumber = () => this.page.getByLabel('Phone Number*').fill(this.promptMessage.phoneNumber);
  // country = () => this.page.getByLabel('Country*').selectOption(this.promptMessage.country);
  // address = () => this.page.getByLabel('Address Line1*').fill(this.promptMessage.address);
  // countyState = () => this.page.getByLabel('County/State').fill(this.promptMessage.countyState);
  // postcode = () => this.page.getByLabel('Post code*').fill(this.promptMessage.postcode);
  // city = () => this.page.getByLabel('City*').fill(this.promptMessage.city);

  // Actions
  public async validatePromptMessage() {
    // Fetch the text content of the form error messages
    const firstNameErrorText = await this.firstName().textContent(); // Await added
    const postcodeErrorText = await this.postcode().textContent(); // Await added

    // Ensure the values are trimmed and compared with expected data from JSON
    expect(firstNameErrorText?.trim()).toBe(this.promptMessage.lastNameError); // Updated to use firstNameError from JSON
    expect(postcodeErrorText?.trim()).toBe(this.promptMessage.postcodeError); // Updated to use postcodeError from JSON    }
  }

  public async paymentPromptMessage() {
    // Fetch the text content of the form error messages
    const cardNumberErrorText = await this.cardNumber().textContent(); // Await added
    const expDateErrorText = await this.expDate().textContent(); // Await added
    const cvvErrorText = await this.cvv().textContent(); // Await added

    // Ensure the values are trimmed and compared with expected data from JSON
    expect(cardNumberErrorText?.trim()).toBe(this.promptMessage.invalidNumber); // Updated to use firstNameError from JSON
    expect(expDateErrorText?.trim()).toBe(this.promptMessage.invalidExpirationDate); // Updated to use postcodeError from JSON    }
    expect(cvvErrorText?.trim()).toBe(this.promptMessage.invalidCvv); // Updated to use postcodeError from JSON    }
  }

}
