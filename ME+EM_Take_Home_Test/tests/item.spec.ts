import { Page, test, expect } from '@playwright/test';
import itemPage from "../pages/itemPage";
import paymentPage from "../pages/paymentPage";
import deliveryPage from "../pages/deliveryPage";

require('dotenv').config({ path: './env/.env' });

let page: Page;

// test("test", async ({ page }) => {
//     console.log(process.env.URL);
// })
test.describe.serial("Validate making an order", () => {
// test.describe.configure({ retries: 2 });
  test.beforeEach(async ({ page }) => {
    const url = process.env.URL as string;
    await page.goto(url);
     const itemImageMain = new itemPage(page);
    // await page.route('**/iframe-url-or-pattern/**', route => route.abort());
    await itemImageMain.popupCookies();
    });

    test("Validate image can be opened", async ({ page }) => {
        const itemImageMain = new itemPage(page)
        // await expect(page.getByTestId('product-detail-block-product-title')).toHaveText('Submitted');
        await itemImageMain.itemImage()
    });

    test("Selecting an item colour and size and placing order", async ({ page }) => {
        test.setTimeout(120000);
        const itemImageMain = new itemPage(page)
        const deliveryDetails = new deliveryPage(page)
        const paymentDetails = new paymentPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown(page)
        await itemImageMain.cartModal()
        await deliveryDetails.deliveryForm(page)
        // test.slow(); // Easy way to triple the default timeout
        await deliveryDetails.deliveryFormDetails(page)
        await deliveryDetails.requestBillingAddress(page)
        await deliveryDetails.selectBillingAddress(page)
        await paymentDetails.paymentDetails(page)
        await paymentDetails.finalConfirmationOfOrder(page)
    });
    
    test.skip("Validate all links on page works", async ({ page }) => {
        const itemImageMain = new itemPage(page)
        await itemImageMain.validateAllPageLinks()
    });

    test("Adding multiple items and validating quantity", async ({ page }) => {
        test.setTimeout(60000);
        const itemImageMain = new itemPage(page)
        // await itemImageMain.itemColourBlack()
        await itemImageMain.itemSizeDropdown2(page)
        await itemImageMain.reloadPage()
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown2(page)
        // await itemImageMain.verifyOneItem(page)
        await itemImageMain.addItemswithSizeSelected(page)
        await itemImageMain.reloadPage()
        await itemImageMain.addShoesItem()
        // await itemImageMain.verifyFourItem(page)
        await itemImageMain.cartModalMultiple()

    });

    test.skip("Validate closing cart modal", async ({ page }) => {
        test.setTimeout(60000);
        const itemImageMain = new itemPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown(page)
        await itemImageMain.cartModalOpen()
        await itemImageMain.clickOutOfModal()
    });

    test("Validate removing an item(s) ", async ({ page }) => {
        test.setTimeout(60000);
        await page.evaluate(() => {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach(iframe => iframe.remove()); // Remove all iframes
        });
        const itemImageMain = new itemPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown(page)
        await itemImageMain.cartModalRemoval()
    });

    test("Incomplete shipping details, form validation", async ({ page }) => {
        test.setTimeout(60000);
        const itemImageMain = new itemPage(page)
        const deliveryDetails = new deliveryPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown(page)
        await itemImageMain.cartModal()
        await deliveryDetails.deliveryForm(page)
        await deliveryDetails.enterInvalidFormDetails(page)
    });


    test("Incorrect card payment details ", async ({ page }) => {
        test.setTimeout(120000);
        const itemImageMain = new itemPage(page)
        const deliveryDetails = new deliveryPage(page)
        const paymentDetails = new paymentPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown(page)
        await itemImageMain.cartModal()
        await deliveryDetails.deliveryForm(page)
        await deliveryDetails.deliveryFormDetails(page)
        await deliveryDetails.requestBillingAddress(page)
        await deliveryDetails.selectBillingAddress(page)
        await paymentDetails.incorrectPaymentDetails(page)
    });

})