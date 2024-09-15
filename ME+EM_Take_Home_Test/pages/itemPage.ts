import { Page, expect, Locator } from "@playwright/test";
import { url } from "inspector";


// const formDetails = JSON.parse(JSON.stringify(testData[0])); //  // Use the first object in the array

export default class ItemsPage {
  cartIcon: Locator;
  constructor(public page: Page) {
    this.page = page;
    this.cartIcon = page.getByLabel('cart');
  }


  async popupCookies() {
    const iframeButton = this.page
      .frameLocator(".onetrust-consent-sdk")
      .getByRole("button", { name: "Accept All Cookies" });
    await iframeButton.isVisible({ timeout: 30000 });
    await this.page.getByRole("button", { name: "Accept All Cookies" }).click();
  }

  async itemImage() {
    await this.page.locator(".w-\\[100\\%\\]").first().click();
  }

  async itemColourRequest(page: { waitForRequest: (arg0: (request: any) => boolean) => any; }) {
    const colourRequest = page.waitForRequest(
      (request: { url: () => string; method: () => string; }) =>
        request.url() ===
          "https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&ddtags=sdk_version%3A5.26.0%2Capi%3Afetch%2Cenv%3Astaging%2Cservice%3Anextjs-frontend-web%2Cversion%3A1.0.0&dd-api-key=pubaccb01427085fbf077f3bb54730fe4f3&dd-evp-origin-version=5.26.0&dd-evp-origin=browser&dd-request-id=96f09020-409d-40ba-816d-32925a691748&batch_time=1726072781038" &&
        request.method() === "POST"
    );
    await colourRequest;
    await expect(url).toContain('order-confirmation');
  }

  async itemColour() {
    const DarkNavy = this.page.getByLabel("Dark Navy");
    await DarkNavy.waitFor({ state: "visible" });
    // await this.itemColourRequest
    await DarkNavy.click({ timeout: 10000 });
    // const confirmationOfItemCol = this.page.waitForRequest(request =>
    //     request.url() === 'https://browser-intake-datadoghq.eu/api/v2/rum?ddsource=browser&ddtags=sdk_version%3A5.23.3%2Capi%3Afetch%2Cenv%3Astaging%2Cservice%3Anextjs-frontend-web%2Cversion%3A1.0.0&dd-api-key=pubaccb01427085fbf077f3bb54730fe4f3&dd-evp-origin-version=5.23.3&dd-evp-origin=browser&dd-request-id=35a9f064-2f5e-4aa9-a6d1-8b848228a022&batch_time=1724789588738' && request.method() === 'POST',
    // );
    // await confirmationOfItemCol;
  }

  async itemColourBlack() {
    for (let i = 0; i < 3; i++) {
      try {
        await this.page.getByLabel("Black").click({ timeout: 30000 });
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

  async clickItemSizeDropdown(page: Page) {
    // Click dropdown
    await this.page.getByTestId("size-select-button-dropdown").click();
  }

  async selectRandomOption(page: Page) {
    // Wait for the size selection listbox to be visible
    await page.waitForSelector('[data-testid="size-select-option-list"]');

    // Get all visible and enabled options
    const enabledOptions = await page.$$eval('[role="option"]', (options) => {
      return options
        .filter((option) => {
          const isDisabled = option.getAttribute("aria-disabled") === "true";
          const isVisible = (option as HTMLElement).offsetParent !== null; // Cast to HTMLElement to avoid TypeScript error
          return !isDisabled && isVisible;
        }) // Filter enabled and visible
        .map((option) => option.getAttribute("data-key")); // Return data-key to identify options
    });

    if (enabledOptions.length === 0) {
      throw new Error("No enabled options available");
    }

    // Select a random enabled option
    const randomOptionKey =
      enabledOptions[Math.floor(Math.random() * enabledOptions.length)];

    // Click the random option
    await page.click(`[data-key="${randomOptionKey}"]`);
  }

  async popup(page: Page) {
    await this.page
      .locator("div.custEmailPopupBox")
      .waitFor({ state: "visible" });
    await this.page.locator("div.close").click({ timeout: 10000 });
  }

  async addToBag() {
    // Add to Bag
    const addToBagButton = this.page.getByRole("button", {
      name: "Add to Bag",
    });
    await addToBagButton.waitFor({ state: "visible" });
    await addToBagButton.click();
  }

  async closePopup(page: { locator: (arg0: string) => any; }) {
    // Close popup that appears
    try {
      // Attempt to locate the popup using its class
      const popupLocator = page.locator(".custEmailPopupBox");
      const closeButtonLocator = popupLocator.locator(".close");

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

  async clickOutOfModal(page: Page) {
    // Locate the dialog panel by its class or unique selector
    const panel = this.page.getByRole("dialog");
    // const reviewBagAndCheckoutButton = this.page.getByText('£59.00 – Review Bag and Checkout');

    // Assert the dialog button is visible
    await expect(panel).toBeVisible();

    // Click outside of the dialog to close it
    await page.evaluate(() => {
      const dialog = document.querySelector(
        "dialog.bg-off-white.slide-from-right.h-full.transition-open"
      );
      if (dialog) {
        dialog.removeAttribute("open"); // Removes the open attribute to close the dialog
      }
    });
  }

  async getCartItemCount(): Promise<number> {
    const textContent = await this.cartIcon.textContent();
    return parseInt(textContent || '0'); // Default to '0' if textContent is null
  }

  async verifyOneItem(page: any) {
    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel("Cart", { exact: true });
    await cartLocator.getByText("1").waitFor({ state: "visible" });
    await expect(cartLocator).toHaveText("1", { timeout: 3000 });
  }

  async verifyFourItem(page: any) {
    // Wait until cart count updates to 1
    const cartLocator = this.page.getByLabel("Cart", { exact: true });
    await cartLocator.getByText("4").waitFor({ state: "visible" });
    await expect(cartLocator).toHaveText("4", { timeout: 3000 });
  }

  async addShoesItem() {
    const shoe = this.page.getByLabel("Flannel Slip-On Trainer");

    // Scroll into view only if necessary
    await shoe.scrollIntoViewIfNeeded({ timeout: 30000 });

    // Ensure the element is visible
    await shoe.waitFor({ state: "visible", timeout: 30000 }); // Wait up to 30 seconds for visibility

    await shoe.first().click({ force: true });

    // await this.page.locator("html").evaluate(node => {
    //   node.style.pointerEvents = "none";
    // });

    // const boundingBox = await shoe.first().boundingBox();
    // if (boundingBox) {
    //   await shoe.first().click({ force: true });
    // } else {
    //   console.log("Element is obstructed or off-screen.");
    // }

    // // Reset pointer events after the click
    // await this.page.locator("html").evaluate(node => {
    //   node.style.pointerEvents = "";
    // });

    await this.page.waitForTimeout(20000);
  }

  async cartModalOpen() {
    // Open the cart panel
    const cartPanel = this.page.locator(".flex.h-full.flex-col");

    // Ensure correct item is displayed
    await cartPanel
      .getByTestId("cart-item-product-info")
      .filter({ hasText: "Palazzo Pant" })
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId("price-display-regular")
      .filter({ hasText: "£59.00" })
      .first()
      .waitFor({ state: "visible" });
  }

  async cartModal() {
    // Open the cart panel
    const cartPanel = this.page.locator(".flex.h-full.flex-col");

    // Ensure correct item is displayed
    await cartPanel
      .getByTestId("cart-item-product-info")
      .filter({ hasText: "Palazzo Pant" })
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId("price-display-regular")
      .filter({ hasText: "£59.00" })
      .first()
      .waitFor({ state: "visible" });

    // Proceed to checkout
    const reviewBagAndCheckoutButton = this.page.getByText(
      "£59.00 – Review Bag and Checkout"
    );
    await reviewBagAndCheckoutButton.click();

    const summaryHeader = this.page.getByRole("heading", {
      name: "Order Summary",
    });
    await summaryHeader.waitFor({ state: "visible" });
    expect(summaryHeader).toHaveText(/Order Summary/);

    const checkoutButton = this.page.getByRole("link", { name: "Checkout" });
    checkoutButton.waitFor({ state: "visible" });
    checkoutButton.click();
  }

  async cartModal2() {
    // Open the cart panel
    const cartPanel = this.page.locator(".flex.h-full.flex-col");

    // Ensure correct item is displayed
    await cartPanel
      .getByTestId("cart-item-product-info")
      .filter({ hasText: "Palazzo Pant" })
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId("price-display-regular")
      .filter({ hasText: "£59.00" })
      .first()
      .waitFor({ state: "visible" });

    // Proceed to checkout
    const reviewBagAndCheckoutButton = this.page.getByText(
      "£59.00 – Review Bag and Checkout"
    );
  }

  async cartModal3() {
    // Open the cart panel
    const cartPanel = this.page.locator(".flex.h-full.flex-col");

    // Ensure correct item is displayed
    await cartPanel
      .getByTestId("cart-item-product-info")
      .filter({ hasText: "Palazzo Pant" })
      .last()
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId("price-display-regular")
      .filter({ hasText: "£59.00" })
      .last()
      .first()
      .waitFor({ state: "visible" });

    // Proceed to checkout
    const reviewBagAndCheckoutButton = this.page.getByText(
      "230.50 – Review Bag and Checkout"
    );
    await reviewBagAndCheckoutButton.click();

    const summaryHeader = this.page.getByRole("heading", {
      name: "Order Summary",
    });
    await this.page.waitForLoadState("load", { timeout: 10000 });
    await summaryHeader.waitFor({ state: "visible" });
    expect(summaryHeader).toHaveText(/Order Summary/);

    const checkoutButton = this.page.getByRole("link", { name: "Checkout" });
    checkoutButton.waitFor({ state: "visible" });
    checkoutButton.click();
  }

  async itemRemoval() {
    // Open the cart panel
    const cartPanel = this.page.locator(".flex.h-full.flex-col");

    // Ensure correct item is displayed
    await cartPanel
      .getByTestId("cart-item-product-info")
      .filter({ hasText: "Palazzo Pant" })
      .waitFor({ state: "visible" });
    await this.page
      .getByTestId("price-display-regular")
      .filter({ hasText: "£59.00" })
      .first()
      .waitFor({ state: "visible" });

    // Remove item
    await this.page.getByText("Remove").click();

    // Validate that item has been removed
    const itemName = cartPanel
      .getByTestId("cart-item-product-info")
      .filter({ hasText: "Palazzo Pant" });
    await expect(itemName).toBeHidden();
    const emptyBasketMessage = this.page.getByTestId("empty-basket-message");
    await expect(emptyBasketMessage).toHaveText(
      "You have no items in your shopping bag"
    );
  }

  async validateAllPageLinks() {
    // Get all the links on the page
    const links = await this.page.$$eval("a", (anchors) =>
      anchors.map((a) => a.href)
    );

    for (const link of links) {
      try {
        // Skip iframe or non-interactable links
        if (await this.isIframeLink(link)) {
          console.log(`Skipping iframe or non-interactable link: ${link}`);
          continue;
        }

        // Open the link and check for the response
        const response = await this.page.goto(link, {
          waitUntil: "networkidle",
          timeout: 60000,
        });

        // Handle popups if they appear
        await this.handlePopup();

        // Check the response status
        if (response && response.status() === 200) {
          console.log(`Link works: ${link}`);
        } else if (response && response.status() === 404) {
          console.log(`Link does not work (404): ${link}`);
        } else if (response) {
          console.log(
            `URL does not work: ${link}, Status: ${response.status()}`
          );
        } else {
          console.log(`No response received for: ${link}`);
        }
      } catch (error) {
        console.log(
          `Error with URL: ${link}, moving to next link. Error: ${error}`
        );
      } finally {
        try {
          // Ensure that the page has completely loaded before going back
          await this.page.waitForTimeout(2000); // Wait a bit before going back
          await this.page.goBack({ waitUntil: "networkidle", timeout: 60000 });
        } catch (goBackError) {
          console.log(
            `Error going back to the main page after checking ${link}:`,
            goBackError
          );
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
        return anchor ? !!anchor.closest("iframe") : false;
      }, link);

      return isIframe;
    } catch (error) {
      console.log(
        `Error checking if link is iframe or non-interactable: ${link}, Error: ${error}`
      );
      return false; // Default to false if there is an error
    }
  }

  // Handle potential popups
  private async handlePopup() {
    try {
      const popupLocator = this.page.locator(".custEmailPopupBox");
      const closeButtonLocator = popupLocator.locator(".close");

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
