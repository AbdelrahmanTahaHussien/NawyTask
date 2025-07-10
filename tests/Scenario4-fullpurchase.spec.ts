import { test, expect } from '@playwright/test';
import { PopUp } from '../Pages/PopUps';
import { HomePage } from '../Pages/homePage';

// test.describe('Test of Login Scenario', async () => {
//   const username = 'TestUserLogin'+Math.floor(Math.random() * 10000);
//   const password = '12345678';
//   const URL = 'https://www.demoblaze.com/index.html'
  
//   test.beforeEach(async ({ page }) => {
//     const homePage = new HomePage(page);

//     await page.goto(URL);
// });

// test('Successfully create an order for an Apple monitor 24', async ({ page }) => {
//     const homePage = new HomePage(page);
//     //User on Sign up
//     await homePage.signUpUser(username,password);

//     //Login with user Credentials
//     await homePage.loginUser(username,password);
//     //Better to wait till page is loaded and to take a locator to be visible for accuracy
//     await homePage.HeaderTabs('Log out').waitFor({state: 'visible'})
    
//     //Choose Monitors type filter 

//     Product added
    
//   });
// });