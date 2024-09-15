import { Page, test, expect } from '@playwright/test';
import itemPage from "../pages/itemPage";
import paymentPage from "../pages/paymentPage";
import deliveryPage from "../pages/deliveryPage";

require('dotenv').config({ path: './env/.env' });

let page: Page;

test.describe.serial("Validate making an order", () => {
    test.describe.configure({ retries: 2 });

    test.beforeEach(async ({ page }) => {
        const url = process.env.URL as string;
        console.log(`Navigating to URL: ${url}`);
        await page.goto(url);
        const itemImageMain = new itemPage(page);
        console.log('Setting up route to block iframe...');
        await page.route('**/iframe-url-or-pattern/**', route => route.abort());
        console.log('Handling cookie popup...');
        await itemImageMain.popupCookies();
    });

    test("Validate image can be opened", async ({ page }) => {
        console.log("Validating image can be opened...");
        const itemImageMain = new itemPage(page);
        await itemImageMain.itemImage();
        console.log("Image validation completed.");
    });

    test("Selecting an item colour and size and placing order", async ({ page }) => {
        test.setTimeout(120000);
        console.log("Starting item selection and order placement...");
        const itemImageMain = new itemPage(page);
        const deliveryDetails = new deliveryPage(page);
        const paymentDetails = new paymentPage(page);
        console.log("Selecting item color...");
        await itemImageMain.itemColour();
        console.log("Opening size dropdown...");
        await itemImageMain.clickItemSizeDropdown(page);
        console.log("Handling popups...");
        await itemImageMain.popup(page);
        console.log("Reopening size dropdown...");
        await itemImageMain.clickItemSizeDropdown(page);
        console.log("Selecting random size...");
        await itemImageMain.selectRandomOption(page);
        console.log("Adding item to bag...");
        await itemImageMain.addToBag();
        await itemImageMain.getCartItemCount();
        console.log("Opening cart modal...");
        await itemImageMain.cartModal();
        console.log("Filling delivery details...");
        await deliveryDetails.deliveryForm2(page);
        await deliveryDetails.deliveryFormDetails(page);
        await deliveryDetails.requestBillingAddress(page);
        await deliveryDetails.selectBillingAddress(page);
        console.log("Entering payment details...");
        await paymentDetails.paymentDetails(page);
        console.log("Finalizing order...");
        await paymentDetails.finalConfirmationOfOrder(page);
        console.log("Order placed successfully.");
    });

    test.skip("Validate all links on page works", async ({ page }) => {
        console.log("Skipping validation of all page links...");
        const itemImageMain = new itemPage(page);
        await itemImageMain.validateAllPageLinks();
    });

    test.skip("Adding multiple items and validating quantity", async ({ page }) => {
        test.setTimeout(120000);
        test.slow();
        console.log("Skipping test for adding multiple items and validating quantity...");
        const itemImageMain = new itemPage(page);
        const deliveryDetails = new deliveryPage(page);
        const paymentDetails = new paymentPage(page);
    });

    test("Validate closing cart modal", async ({ page }) => {
        test.setTimeout(60000);
        console.log("Validating closing of cart modal...");
        const itemImageMain = new itemPage(page);
        await itemImageMain.itemColour();
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.popup(page);
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.selectRandomOption(page);
        await itemImageMain.addToBag();
        await itemImageMain.cartModalOpen();
        console.log("Closing cart modal...");
        await itemImageMain.clickOutOfModal(page);
        await page.waitForTimeout(1000);
        console.log("Cart modal closed.");
    });

    test("Validate removing an item(s)", async ({ page }) => {
        test.setTimeout(60000);
        console.log("Starting item removal validation...");
        const itemImageMain = new itemPage(page);
        await itemImageMain.itemColour();
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.popup(page);
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.selectRandomOption(page);
        await itemImageMain.addToBag();
        await itemImageMain.getCartItemCount();
        console.log("Opening cart modal for item removal...");
        await itemImageMain.cartModal2();
        console.log("Removing item from cart...");
        await itemImageMain.itemRemoval();
        console.log("Item removed successfully.");
    });

    test("Incomplete shipping details, form validation", async ({ page }) => {
        test.setTimeout(60000);
        console.log("Starting incomplete shipping details form validation...");
        const itemImageMain = new itemPage(page);
        const deliveryDetails = new deliveryPage(page);
        await itemImageMain.itemColour();
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.popup(page);
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.selectRandomOption(page);
        await itemImageMain.addToBag();
        await itemImageMain.cartModal();
        console.log("Filling delivery form with invalid details...");
        await deliveryDetails.deliveryForm(page);
        await deliveryDetails.enterInvalidFormDetails(page);
        await deliveryDetails.errorAlert(page);
        console.log("Form validation for incomplete shipping details completed.");
    });

    test("Incorrect card payment details", async ({ page }) => {
        test.setTimeout(120000);
        console.log("Starting test for incorrect card payment details...");
        const itemImageMain = new itemPage(page);
        const deliveryDetails = new deliveryPage(page);
        const paymentDetails = new paymentPage(page);
        await itemImageMain.itemColour();
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.popup(page);
        await itemImageMain.clickItemSizeDropdown(page);
        await itemImageMain.selectRandomOption(page);
        await itemImageMain.addToBag();
        await itemImageMain.cartModal();
        await deliveryDetails.deliveryForm(page);
        await deliveryDetails.deliveryFormDetails(page);
        await deliveryDetails.requestBillingAddress(page);
        await deliveryDetails.selectBillingAddress(page);
        console.log("Entering incorrect payment details...");
        await paymentDetails.incorrectPaymentDetails(page);
        await paymentDetails.errorAlert(page);
        await page.waitForTimeout(1000);
        console.log("Test for incorrect card payment details completed.");
    });
});
