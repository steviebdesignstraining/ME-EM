import { test, expect } from '@playwright/test';
import itemPage from "../pages/itemPage";
import paymentPage from "../pages/paymentPage";
import deliveryPage from "../pages/deliveryPage";

require('dotenv').config({ path: './env/.env' });


// test("test", async ({ page }) => {
//     console.log(process.env.URL);
// })
test.describe.serial("Validate making an order", () => {
  test.beforeEach(async ({ page }) => {
    const url = process.env.URL as string;
    await page.goto(url);
     const itemImageMain = new itemPage(page);
    await itemImageMain.popupCookies();
    });

    test("Validate image can be opened", async ({ page }) => {
        const itemImageMain = new itemPage(page)
        // await expect(page.getByTestId('product-detail-block-product-title')).toHaveText('Submitted');
        await itemImageMain.itemImage()
    });

    test("Selecting an item colour and size and proceeding with valid credentials", async ({ page }) => {
        test.setTimeout(60000);
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
        await paymentDetails.paymentDetails(page)
        await paymentDetails.finalConfirmationOfOrder(page)
    });
    
    test("Validate all links on page works ", async ({ page }) => {
        const itemImageMain = new itemPage(page)
        await itemImageMain.validateAllPageLinks()
    });

    test("Adding multiple items and validating quantity", async ({ page }) => {
        test.setTimeout(120000);
        const itemImageMain = new itemPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown2(page)
        await itemImageMain.verifyOneItem(page)
        await itemImageMain.addItemswithSizeSelected(page)
        await itemImageMain.addShoesItem()
        await itemImageMain.itemColourBlack()
        await itemImageMain.verifythreeItem(page)
        await itemImageMain.cartModal()

    });

    test("Validate closing cart modal ", async ({ page }) => {
        test.setTimeout(60000);
        const itemImageMain = new itemPage(page)
        await itemImageMain.itemColour()
        await itemImageMain.itemSizeDropdown2(page)
        await itemImageMain.cartModalOpen()
        await itemImageMain.clickOutOfModal()
    });

    test("Validate removing an item(s) ", async ({ page }) => {

    });

    test("Enter valid shipping details ", async ({ page }) => {

    });

    test("Incomplete shipping form ", async ({ page }) => {

    });

    test("Form validation prompt ", async ({ page }) => {

    });

    test("Incorrect card payment details ", async ({ page }) => {

    });

    test("Try Before You Buy With Harper ", async ({ page }) => {

    });
})