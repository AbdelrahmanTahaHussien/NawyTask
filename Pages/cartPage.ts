import { Locator,Page } from "@playwright/test";


export class CartPage {
    readonly page: Page;
    readonly tableRows: Locator;
    readonly totalPriceText: Locator;
    readonly placeOrderButton: Locator;
  
    constructor(page: Page) {
      this.page = page;
      this.tableRows = this.page.locator('#tbodyid > tr');
      this.totalPriceText = this.page.locator('#totalp'); 
      this.placeOrderButton = this.page.getByRole('button', { name: 'Place Order' });
    }
  
    // Get all product titles in the cart
    async getCartProductTitles(): Promise<string[]> {
      return this.tableRows.locator('td:nth-child(2)').allTextContents();
    }
  
    // Get all product prices in the cart
    async getCartProductPrices(): Promise<number[]> {
      const prices = await this.tableRows.locator('td:nth-child(3)').allTextContents();
      return prices.map(price => parseInt(price, 10));
    }
  
    // Check that total price matches sum of individual items
    async assertTotalMatchesItems() {
      let isTotalCorrect : boolean = false;  
      const prices = await this.getCartProductPrices();
      const totalExpected = prices.reduce((sum, p) => sum + p, 0);
      const totalActual = parseInt(await this.totalPriceText.textContent() || '0', 10);
      totalActual == totalExpected ?   isTotalCorrect = true : false
      return isTotalCorrect;
    }
  
    // Delete a product from the cart by its name
    async deleteProductByName(productName: string) {
      const row = this.tableRows.filter({ hasText: productName });
      await row.getByRole('link',{name:'Delete'}).click();
    }
  
    // Click Place Order button
    async placeOrder() {
      await this.placeOrderButton.click();
    }
  }
