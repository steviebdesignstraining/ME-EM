import { Page, expect } from "@playwright/test";
import FormActions from "../sections/deliveryFormActions.section";
import testData from "../testData/deliveryAddress.json";

const formDetails = JSON.parse(JSON.stringify(testData[0])); //  // Use the first object in the array


export default class ItemsPage {
  constructor(public page: Page) {
    this.page = page;
  }

  async popupCookies() {
    const iframeButton = this.page.frameLocator('.onetrust-consent-sdk').getByRole('button', { name: 'Accept All Cookies' });
    await iframeButton.isVisible( /*{timeout: 3000}*/ )
    await this.page.getByRole('button', { name: 'Accept All Cookies' }).click()
  }

  async itemImage() {
    await this.page.locator('.w-\\[100\\%\\]').first().click();
  }

  async itemColour() {
    const DarkNavy = this.page.getByLabel('Dark Navy')
    await DarkNavy.waitFor({ state: 'visible' });
    await DarkNavy.click({ timeout: 10000 });
    // const confirmationOfItemCol = this.page.waitForRequest(request =>
    //     request.url() === 'https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&ddtags=sdk_version%3A5.23.3%2Capi%3Afetch%2Cenv%3Astaging%2Cservice%3Anextjs-frontend-web%2Cversion%3A1.0.0&dd-api-key=pubaccb01427085fbf077f3bb54730fe4f3&dd-evp-origin-version=5.23.3&dd-evp-origin=browser&dd-request-id=35a9f064-2f5e-4aa9-a6d1-8b848228a022&batch_time=1724789588738' && request.method() === 'POST',
    // );
    // await confirmationOfItemCol; 
  }

  async itemColourBlack() {
    await this.page.getByLabel('Black').click();
  }

  async itemSizeDropdown(page) {
    // Click dropdown
    await this.page.getByTestId('size-select-button-dropdown').click();
    
    // Close popup that appears
    try {
        // Attempt to locate the popup using its class
        const popupLocator = page.locator('.custEmailPopupBox');
        const closeButtonLocator = popupLocator.locator('.close');

        // Check if the popup is visible
        if (await popupLocator.isVisible({ timeout: 3000 })) {
            // If visible, click the close button
            await closeButtonLocator.click();
            console.log("Popup closed successfully.");
        } else {
            console.log("Popup not visible.");
        }
    } catch (error) {
        console.log("Popup did not appear or there was an error:", error);
    }
    
    // Click dropdown
    await this.page.getByTestId('size-select-button-dropdown').click();

    
    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByRole('option');
    await dropdownList.filter({ hasText: 'UK 10' }).waitFor({ state: 'visible' });

    // Select size
    await dropdownList.filter({ hasText: 'UK 10' }).click();
    
    // Add to Bag
    const addToBagButton = this.page.getByRole('button', { name: 'Add to Bag' });
    await addToBagButton.waitFor({ state: 'visible' });
    await addToBagButton.click();

    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel('Cart', { exact: true });
    await cartLocator.getByText('1').waitFor({ state: 'visible' });
    await expect(cartLocator).toHaveText('1', { timeout: 3000 })  
}

async itemSizeDropdown2(page) {
    // Click dropdown
    await this.page.getByTestId('size-select-button-dropdown').click();
    
    
    // Click dropdown
    await this.page.getByTestId('size-select-button-dropdown').click();

    
    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByRole('option');
    await dropdownList.filter({ hasText: 'UK 10' }).waitFor({ state: 'visible' });

    // Select size
    await dropdownList.filter({ hasText: 'UK 10' }).click();
    
    // Add to Bag
    const addToBagButton = this.page.getByRole('button', { name: 'Add to Bag' });
    await addToBagButton.waitFor({ state: 'visible' });
    await addToBagButton.click();

        // Close popup that appears
        try {
            // Attempt to locate the popup using its class
            const popupLocator = page.locator('.custEmailPopupBox');
            const closeButtonLocator = popupLocator.locator('.close');
    
            // Check if the popup is visible
            if (await popupLocator.isVisible({ timeout: 3000 })) {
                // If visible, click the close button
                await closeButtonLocator.click();
                console.log("Popup closed successfully.");
            } else {
                console.log("Popup not visible.");
            }
        } catch (error) {
            console.log("Popup did not appear or there was an error:", error);
        }    

}

async clickOutOfModal() {
    const panel = this.page.locator('.flex h-full flex-col').getByTestId('cart-item-product-info').filter({ hasText: 'Palazzo Pant' })
    await expect(panel).toBeVisible()
    await this.page.locator('.sticky top-0 z-50').click()
    await expect(panel).toBeHidden()
}


async addMultipleItems(page) {
    // Click dropdown
    await this.page.getByTestId('size-select-button-dropdown').click();
    
    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByRole('option');
    await dropdownList.filter({ hasText: 'UK 10' }).waitFor({ state: 'visible' });

    // Select size
    await dropdownList.filter({ hasText: 'UK 10' }).click();
    
    // Add to Bag
    const addToBagButton = this.page.getByRole('button', { name: 'Add to Bag' });
    await addToBagButton.waitFor({ state: 'visible' });
    await addToBagButton.click();
}

async addItemswithSizeSelected(page) {    
    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByTestId('size-select-button-dropdown');
    await dropdownList.filter({ hasText: 'UK 10' }).waitFor({ state: 'visible' });    
    // Add to Bag
    const addToBagButton = this.page.getByRole('button', { name: 'Add to Bag' });
    await this.page.waitForTimeout(1000); // Wait for 1 second before retrying
    for (let i = 0; i < 3; i++) {
        try {
            await addToBagButton.click({ timeout: 10000 });
            break; // Break the loop if click is successful
        } catch (error) {
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            await this.page.waitForTimeout(1000); // Wait for 1 second before retrying
        }
    }
}

async verifyOneItem(page) {
    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel('Cart', { exact: true });
    await cartLocator.getByText('1').waitFor({ state: 'visible' });
    await expect(cartLocator).toHaveText('1', { timeout: 3000 })    
}

async verifythreeItem(page) {
    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel('Cart', { exact: true });
    await cartLocator.getByText('3').waitFor({ state: 'visible' });
    await expect(cartLocator).toHaveText('3', { timeout: 3000 })    
}

async addShoesItem() {
    const shoe = this.page.getByLabel('Flannel Slip-On Trainer');

    // Ensure the element is visible
    await shoe.waitFor({ state: 'visible', timeout: 30000 }); // Wait up to 30 seconds for visibility

    // Scroll into view only if necessary
    await shoe.scrollIntoViewIfNeeded({ timeout: 30000 });

    // Log any bounding box or potential issues
    const boundingBox = await shoe.boundingBox();
    console.log('Bounding box of shoe:', boundingBox);

    // Using alternative locators for the shoe title link
    const shoeTitleLink = this.page.locator('a').filter({ hasText: 'Flannel Slip-On Trainer' });
    await shoeTitleLink.waitFor({ state: 'visible', timeout: 10000 });
    await shoeTitleLink.click({ timeout: 30000 });

    // const shoePageTitle = this.page.getByTestId('product-detail-block-product-title');
    // await shoePageTitle.waitFor({ state: 'visible', timeout: 10000 });
    // await expect(shoePageTitle).toHaveText('Flannel Slip-On Trainer');

    // // Click the shoe size button
    // const sizeButton = this.page.getByRole('button', { name: '38.5 (UK 5.5)' });
    // await sizeButton.waitFor({ state: 'visible', timeout: 10000 }); // Ensure size button is visible
    // await sizeButton.click({ timeout: 5000 }); // Attempt to click size button
}

async cartModalOpen() {
    // Open the cart panel
    const cartPanel = this.page.locator('.flex.h-full.flex-col');

    // Ensure correct item is displayed
    await cartPanel.getByTestId('cart-item-product-info').filter({ hasText: 'Palazzo Pant' }).waitFor({ state: 'visible' });
    await this.page.getByTestId('price-display-regular').filter({ hasText: '£59.00' }).first().waitFor({ state: 'visible' });
}

  async cartModal() {
    // Open the cart panel
    const cartPanel = this.page.locator('.flex.h-full.flex-col');

    // Ensure correct item is displayed
    await cartPanel.getByTestId('cart-item-product-info').filter({ hasText: 'Palazzo Pant' }).waitFor({ state: 'visible' });
    await this.page.getByTestId('price-display-regular').filter({ hasText: '£59.00' }).first().waitFor({ state: 'visible' });

    // Proceed to checkout
    const reviewBagAndCheckoutButton = this.page.getByText('£59.00 – Review Bag and Checkout');
    await reviewBagAndCheckoutButton.click();
    
    const summaryHeader = this.page.getByRole('heading', { name: 'Order Summary' });
    await summaryHeader.waitFor({ state: 'visible' });
    expect(summaryHeader).toHaveText(/Order Summary/);
    
    const checkoutButton = this.page.getByRole('link', { name: 'Checkout' })
    checkoutButton.waitFor({ state: 'visible' })
    checkoutButton.waitFor({ state: 'visible' })
    checkoutButton.click();
  }

  async validateAllPageLinks() {
  // Get all the links on the page
  const links = await this.page.$$eval('a', anchors => anchors.map(a => a.href));

  for (const link of links) {
    try {
      // Navigate to the link
      const [response] = await Promise.all([
        this.page.waitForResponse(response => response.url() === link && response.status() === 200),
        this.page.goto(link),
      ]);

      // Check if the response status is 200 (OK)
      if (response.status() === 200) {
        console.log(`Link works: ${link}`);
      } else {
        console.log(`URL does not work: ${link}`);
      }

      // Go back to the original page to continue testing other links
      await this.page.goBack();
    } catch (error) {
      console.log(`Error with URL: ${link}, moving to next link. Error: ${error}`);
    }
  }    
  }

}
