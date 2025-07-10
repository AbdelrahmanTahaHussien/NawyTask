import { test, expect } from '@playwright/test';
import { PopUp } from '../Pages/PopUps';
import { HomePage } from '../Pages/homePage';

test.describe('Test of Login Scenario', async () => {
  const username = 'TestUserLogin'+Math.floor(Math.random() * 10000);
  const password = '12345678';
  const URL = 'https://www.demoblaze.com/index.html'
  
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);

    await page.goto(URL);
});

test('User Can Login with Valid Data', async ({ page }) => {
    const homePage = new HomePage(page);
    //User on Sign up
    await homePage.signUpUser(username,password);

    //Login with user Credentials
    await homePage.loginUser(username,password);
    //Better to wait till page is loaded and to take a locator to be visible for accuracy
    await homePage.HeaderTabs('Log out').waitFor({state: 'visible'})
    
    //Validate it logged in successfully
    expect.soft(await homePage.loggedinUserTag()).toBe(`Welcome ${username}`)    
    
  });

  test('Check when user try login with valid username but wrong password', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUp = new PopUp(page);
    //User on Sign up
    await homePage.signUpUser(username,password);

    await homePage.HeaderTabs('Log in').click();
    //Fill in with invalid Credentials
    await signUp.fillSignInfields('username', username);
    await signUp.fillSignInfields('password', '1213');

    await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        expect(dialog.type()).toBe('alert');
        //expect on the message 
        expect(dialog.message()).toBe('Wrong password.');
        await dialog.accept();
      }),
      await signUp.clickButton('Log in','Log in'),
    ]);
  });

  test('Check when user try login with invalid username', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUp = new PopUp(page);
    
    await homePage.HeaderTabs('Log in').click();
    //Fill in with invalid Credentials
    await signUp.fillSignInfields('username', 'Tsdaascasew1');
    await signUp.fillSignInfields('password', '123');

    await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        expect(dialog.type()).toBe('alert');
        //expect on the message 
        expect(dialog.message()).toBe('User does not exist.');
        await dialog.accept();
      }),
      await signUp.clickButton('Log in','Log in'),
    ]);
  });
});
