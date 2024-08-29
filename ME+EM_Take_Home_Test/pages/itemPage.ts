import { Page, expect } from "@playwright/test";
import FormActions from "../sections/deliveryFormActions.section";
import testData from "../testData/deliveryAddress.json";

// const formDetails = JSON.parse(JSON.stringify(testData[0])); //  // Use the first object in the array


export default class ItemsPage {
  constructor(public page: Page) {
    this.page = page;
  }

  async handleIframes(page) {
    // Detect iframes and handle them
    const iframes = await page.$$('iframe');
    if (iframes.length > 0) {
      console.log(`Found ${iframes.length} iframes.`);
      for (const iframe of iframes) {
        const frame = await iframe.contentFrame();
        if (frame) {
          // Perform actions inside the iframe if needed
          // Example: close or log something within the iframe
        }
      }
    }
  }
  

  async popupCookies() {
    const iframeButton = this.page.frameLocator('.onetrust-consent-sdk').getByRole('button', { name: 'Accept All Cookies' });
    await iframeButton.isVisible( {timeout: 30000} )
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
    for (let i = 0; i < 3; i++) {
        try {
            await this.page.getByLabel('Black').click({timeout: 30000});
            break; // Break the loop if click is successful
        } catch (error) {
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            await this.page.waitForTimeout(1000); // Wait for 1 second before retrying
        }
    }
  }

  async reloadPage() {
    // Reload or Refresh Page
    await this.page.reload();
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
    // Call handleIframes in your test where needed
    await this.handleIframes(page);

    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel('Cart', { exact: true });
    await cartLocator.getByText('1').waitFor({ state: 'visible' });
    await expect(cartLocator).toHaveText('1', { timeout: 3000 })  
}

async itemSizeDropdown2(page) {
    try {
      // Disable iframes by removing them
      await page.evaluate(() => {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => iframe.remove());
      });
        
    // Click dropdown
    await this.page.getByTestId('size-select-button-dropdown').click();

    
    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByRole('option');
    await dropdownList.filter({ hasText: 'UK 10' }).waitFor({ state: 'visible' });

    await this.handleIframes(page);

    // Select size
    await dropdownList.filter({ hasText: 'UK 10' }).click();

    await this.handleIframes(page);

    
      // Add to Bag
      const addToBagButton = this.page.getByRole('button', { name: 'Add to Bag' });
      await addToBagButton.waitFor({ state: 'visible', timeout: 120000 });
      await addToBagButton.click();
  
      // Handle popup
      await this.handlePopup2();
    } catch (error) {
      console.error('Error in itemSizeDropdown2 function:', error);
      throw error;
    }
  }
  
  private async handlePopup2() {
    try {
      const popupLocator = this.page.locator('.custEmailPopupBox');
      const closeButtonLocator = popupLocator.locator('.close');
  
      // Wait for popup to be visible and attempt to close it
      await popupLocator.waitFor({ state: 'visible', timeout: 3000 });
      if (await popupLocator.isVisible()) {
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
    await this.page.getByTestId('size-select-button-dropdown').click()
    
    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByRole('option', { name: 'UK 10' });
    await dropdownList.filter({ hasText: 'UK 10' }).waitFor({ state: 'visible' });
    await dropdownList.click()    
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

async verifyFourItem(page) {
    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel('Cart', { exact: true });
    await cartLocator.getByText('4').waitFor({ state: 'visible' });
    await expect(cartLocator).toHaveText('4', { timeout: 3000 })    
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
    for (let i = 0; i < 3; i++) {
        try {
            await shoeTitleLink.click({ timeout: 30000 });
            break; // Break the loop if click is successful
        } catch (error) {
            console.log(`Attempt ${i + 1} failed. Retrying...`);
            await this.page.waitForTimeout(1000); // Wait for 1 second before retrying
        }

    }

    const shoePageTitle = this.page.getByTestId('product-detail-block-product-title');
    await shoePageTitle.waitFor({ state: 'visible', timeout: 10000 });
    await expect(shoePageTitle).toHaveText('Flannel Slip-On Trainer');

    // Click the shoe size button
    const sizeDropDown = this.page.getByTestId('size-select-button-dropdown')
    await sizeDropDown.waitFor({ state: 'visible', timeout: 10000 }); // Ensure size button is visible
    await sizeDropDown.click({ timeout: 5000 }); // Attempt to click size button

    // Wait for the dropdown to be visible
    const dropdownList = this.page.getByRole('option');
    await dropdownList.filter({ hasText: '39 (UK 6)' }).waitFor({ state: 'visible' });
    
    // Select size
    await dropdownList.filter({ hasText: '39 (UK 6)' }).click();
    
    // Click Add to bag
    const addToBagButton = this.page.getByRole('button', { name: 'Add to Bag' });
    await addToBagButton.waitFor({ state: 'visible' });
    await addToBagButton.click();

    // Close popup that appears
    try {
        // Attempt to locate the popup using its class
        const popupLocator = this.page.locator('.custEmailPopupBox');
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
    checkoutButton.click();
  }

  async cartModalRemoval() {
    // Open the cart panel
    const cartPanel = this.page.locator('.flex.h-full.flex-col');

    // Ensure correct item is displayed
    await cartPanel.getByTestId('cart-item-product-info').filter({ hasText: 'Palazzo Pant' }).waitFor({ state: 'visible' });
    await this.page.getByTestId('price-display-regular').filter({ hasText: '£59.00' }).first().waitFor({ state: 'visible' });

    // Remove item
    await this.page.getByText('Remove').click()

    // Validate that item has been removed
    const itemName = cartPanel.getByTestId('cart-item-product-info').filter({ hasText: 'Palazzo Pant' })
    await expect(itemName).toBeHidden()
    const emptyBasketMessage = this.page.getByTestId("empty-basket-message")
    await expect(emptyBasketMessage).toHaveText('You have no items in your shopping bag')

  }

  async cartModalMultiple() {
    // Open the cart panel
    const cartPanel = this.page.locator('.flex.h-full.flex-col');

    // Ensure correct item is displayed
    await cartPanel.getByTestId('cart-item-product-info').filter({ hasText: 'Palazzo Pant' }).waitFor({ state: 'visible' });
    await this.page.getByTestId('price-display-regular').filter({ hasText: '£59.00' }).first().waitFor({ state: 'visible' });

    // Proceed to checkout
    const reviewBagAndCheckoutButton = this.page.getByRole('link', { name: '£289.50 – Review Bag and' })
    expect(reviewBagAndCheckoutButton).toHaveText(/£289.50 – Review Bag and/);
    await reviewBagAndCheckoutButton.click();
    
    const summaryHeader = this.page.getByRole('heading', { name: 'Order Summary' });
    await summaryHeader.waitFor({ state: 'visible' });
    expect(summaryHeader).toHaveText(/Order Summary/);
    
    const checkoutButton = this.page.getByRole('link', { name: 'Checkout' })
    checkoutButton.waitFor({ state: 'visible' })
    checkoutButton.click();
  }


  // validateAllPageLinks

  async validateAllPageLinks() {
    // Get all the links on the page
    const links = await this.page.$$eval('a', anchors => anchors.map(a => a.href));
  
    for (const link of links) {
      try {
        // Skip iframe or non-interactable links
        if (await this.isIframeLink(link)) {
          console.log(`Skipping iframe or non-interactable link: ${link}`);
          continue;
        }
  
        // Open the link and check for the response
        const response = await this.page.goto(link, { waitUntil: 'networkidle', timeout: 60000 });
  
        // Handle popups if they appear
        await this.handlePopup();
  
        // Check the response status
        if (response && response.status() === 200) {
          console.log(`Link works: ${link}`);
        } else if (response && response.status() === 404) {
          console.log(`Link does not work (404): ${link}`);
        } else if (response) {
          console.log(`URL does not work: ${link}, Status: ${response.status()}`);
        } else {
          console.log(`No response received for: ${link}`);
        }
      } catch (error) {
        console.log(`Error with URL: ${link}, moving to next link. Error: ${error}`);
      } finally {
        try {
          // Ensure that the page has completely loaded before going back
          await this.page.waitForTimeout(2000); // Wait a bit before going back
          await this.page.goBack({ waitUntil: 'networkidle', timeout: 60000 });
        } catch (goBackError) {
          console.log(`Error going back to the main page after checking ${link}:`, goBackError);
        }
      }
    }
  }
  
  // Utility function to determine if a link is inside an iframe or non-interactable
  private async isIframeLink(link: string): Promise<boolean> {
    try {
      // Check if the link is inside an iframe
      const isIframe = await this.page.evaluate((link) => {
        const anchor = document.querySelector(`a[href="${link}"]`);
        return anchor ? !!anchor.closest('iframe') : false;
      }, link);
  
      return isIframe;
    } catch (error) {
      console.log(`Error checking if link is iframe or non-interactable: ${link}, Error: ${error}`);
      return false; // Default to false if there is an error
    }
  }
  
  // Handle potential popups
  private async handlePopup() {
    try {
      const popupLocator = this.page.locator('.custEmailPopupBox');
      const closeButtonLocator = popupLocator.locator('.close');
  
      if (await popupLocator.isVisible({ timeout: 3000 })) {
        await closeButtonLocator.click();
        console.log("Popup closed successfully.");
      } else {
        console.log("Popup not visible.");
      }
    } catch (popupError) {
      console.log("Popup did not appear or there was an error:", popupError);
    }
  }
         
}
