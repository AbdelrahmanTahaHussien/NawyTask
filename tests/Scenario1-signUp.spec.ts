import { test, expect } from '@playwright/test';
import { PopUp } from '../Pages/PopUps';
import { HomePage } from '../Pages/homePage';

test.describe('Test of SignUp Scenario', async () => {
  const username = 'Test' + Math.floor(Math.random() * 10000);
  const password = '12345678';
  const URL = 'https://www.demoblaze.com/index.html'
  
  test.beforeEach(async ({ page }) => {
    await page.goto(URL);
  });

  test('User Can Sign In with Valid Data', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUp = new PopUp(page);
    //click on Sign up
    await homePage.HeaderTabs('Log in').click();
    //Fill in with Valid Credentials
    await signUp.fillSignUpfields('username', username);
    await signUp.fillSignUpfields('password', password);

    await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        expect.soft(dialog.type()).toBe('alert');
        //expect on the message 
        expect.soft(dialog.message()).toBe('Sign up successful.');
        await dialog.accept();
      }),
      await signUp.clickButton('Sign up', 'Sign up'),
    ]);
  });

  test('User Can Sign Up with already existing credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUp = new PopUp(page);
    //click on Sign up
    await homePage.HeaderTabs('Sign up').click();
    //Fill in with repeated Credentials
    await signUp.fillSignUpfields('username', username);
    await signUp.fillSignUpfields('password', password);

    await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        expect.soft(dialog.type()).toBe('alert');
        //expect on the message 
        expect.soft(dialog.message()).toBe('This user already exist.');
        await dialog.accept();
      }),
      await signUp.clickButton('Sign up', 'Sign up'),
    ]);
  });

  test('User Can Sign Up with empty credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const signUp = new PopUp(page);
    //click on Sign up
    await homePage.HeaderTabs('Sign up').click();
    //Fill in with empty Credentials
    await signUp.fillSignUpfields('username', '');
    await signUp.fillSignUpfields('password', '');

    await Promise.all([
      page.waitForEvent('dialog').then(async (dialog) => {
        expect.soft(dialog.type()).toBe('alert');
        //expect on the message 
        expect.soft(dialog.message()).toBe('Please fill out Username and Password.');
        await dialog.accept();
      }),
      await signUp.clickButton('Sign up', 'Sign up'),
    ]);
  });
});
