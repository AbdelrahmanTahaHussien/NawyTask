import { test, expect } from '@playwright/test';
import { PopUp } from '../Pages/PopUps';
import { HomePage } from '../Pages/homePage';
import { CartPage } from '../Pages/cartPage';

test.describe('Test of Purchase of an Item Test Suite', async () => {
  const username = 'TestUserLogin'+Math.floor(Math.random() * 10000);
  const password = '12345678';
  const URL = process.env.BASE_URL || 'https://www.demoblaze.com/index.html';
  
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto(URL);
});

test('Check when order is placed it gives success message',async({page})=>{
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const popUp = new PopUp(page);

    await homePage.chooseFilterCategory('Monitors').click();
    await page.waitForLoadState();
    await homePage.chooseItem('Apple monitor 24');
   //Check the alert message
    await Promise.all([
        page.waitForEvent('dialog').then(async (dialog) => {
          expect.soft(dialog.type()).toBe('alert');
          //expect on the message 
          expect.soft(dialog.message()).toBe('Product added.');
          await dialog.accept();
        }),
        await homePage.addToCartBtn.click(),
      ]);
})
test('Successfully create an order for an Apple monitor 24', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);
    const popUp = new PopUp(page);
    const userData = {
        name  : 'NawyTest' , 
        country : 'Egypt',
        city : 'Cairo' , 
        card : '1234567890' ,
        month : '07',
        year : '25'
    }
    //User on Sign up
    await homePage.signUpUser(username,password);

    //Login with user Credentials
    await homePage.loginUser(username,password);
    //Better to wait till page is loaded and to take a locator to be visible for accuracy
    await homePage.HeaderTabs('Log out').waitFor({state: 'visible'})
    
    //Add item to Cart 
    await homePage.addItemToCart('Monitors','Apple monitor 24');

    //Navigate to Cart and place order
    await homePage.HeaderTabs('Cart').click();
    await page.waitForLoadState();
    await cartPage.placeOrder();

    //fill placeorder form

    await popUp.fillPlaceOrderForm(userData);
    await popUp.submitOrder();
    expect.soft(await popUp.orderSuccessIcon().count()).toBe(1);
    expect.soft(await popUp.successDialogDetails()).toContain('Name: NawyTestDate: 11/6/2025');
  });
});