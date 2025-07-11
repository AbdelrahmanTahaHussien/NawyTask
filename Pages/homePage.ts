import {Locator , Page} from '@playwright/test'
import { PopUp } from './PopUps';
import { CartPage } from './cartPage';

export class HomePage{
    readonly page : Page;
    readonly popUp : PopUp;
    readonly cartPage : CartPage;
    readonly navbarUserIdentifier : Locator;
    readonly addToCartBtn: Locator;
    constructor(page:Page){
        this.page= page;
        this.popUp = new PopUp(page);
        this.cartPage = new CartPage(page);
        this.navbarUserIdentifier = this.page.locator('.navbar-nav.ml-auto').locator('#nameofuser');
        this.addToCartBtn = this.page.getByRole('link', { name: 'Add to cart' });
    }

    //Generate the Username and Password
    usernameAndPassword(){
        const username =  'AbdelrahmanTestLogin'+Math.floor(Math.random() * 10000);
        const password = '123456789'
        return  [username,password];
    }
    // Returns the locator for a header tab by name
    HeaderTabs(tabNeeded : 'Sign up'|'Log in'|'Cart'|'About us' |'Contact'|'Log out'){
    return this.page.getByRole('link', { name: tabNeeded ,exact : true});
    }
    // Signs up a user with the provided username and password
    async signUpUser(username : string , password : string){
        await this.HeaderTabs('Sign up').click();
        await this.popUp.fillSignUpfields('username',username);
        await this.popUp.fillSignUpfields('password',password);
        await this.popUp.clickButton('Sign up','Sign up');
    }
    // Logs in a user with the provided username and password
    async loginUser(username : string , password : string){
        await this.HeaderTabs('Log in').click();
        await this.popUp.fillSignInfields('username',username);
        await this.popUp.fillSignInfields('password',password);
        await this.popUp.clickButton('Log in','Log in');
    }
    // Returns the text content of the logged-in user tag
    async loggedinUserTag()
    {
        const textOfTag = await this.navbarUserIdentifier.textContent();
        return textOfTag;
    }
    // Returns the locator for a filter category by name
    chooseFilterCategory(fitler: string){
    return this.page.locator('.list-group').getByRole('link', { name: fitler });
    }
    // Selects an item by its name
    async chooseItem(itemName: string){
        await this.page.getByRole('link', { name: itemName }).click();
        await this.page.waitForLoadState();
    }
    // Adds an item to the cart by category and name
    async addItemToCart(typeofItem : 'Phones' | 'Laptops'|'Monitors' | string , name : string){
      
        await this.chooseFilterCategory(typeofItem).click();
        await this.page.waitForLoadState();
        await this.chooseItem(name);
        await this.addToCartBtn.click();
        
    }
    // Performs a full item purchase flow
    async fullItemPurschase(typeofItem: string, name : string){
        await this.addItemToCart(typeofItem,name);
        await this.HeaderTabs('Cart').click();
        await this.page.waitForLoadState();
        await this.cartPage.placeOrder();
        await this.popUp.fillPlaceOrderForm

    }

}