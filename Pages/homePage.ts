import {Locator , Page} from '@playwright/test'
import { PopUp } from './PopUps';
import { Await } from 'react-router-dom';

export class HomePage{
    readonly page : Page;
    readonly popUp : PopUp;
    readonly navbarUserIdentifier : Locator;
    readonly addToCartBtn: Locator;
    constructor(page:Page){
        this.page= page;
        this.popUp = new PopUp(page);
        this.navbarUserIdentifier = this.page.locator('.navbar-nav.ml-auto').locator('#nameofuser');a
        this.addToCartBtn = this.page.getByRole('link', { name: 'Add to cart' });
    }
    HeaderTabs(tabNeeded : 'Sign up'|'Log in'|'Cart'|'About us' |'Contact'|'Log out'){
    return this.page.getByRole('link', { name: tabNeeded ,exact : true});
    }
    async signUpUser(username : string , password : string){
        await this.HeaderTabs('Sign up').click();
        await this.popUp.fillSignUpfields('username',username);
        await this.popUp.fillSignUpfields('password',password);
        await this.popUp.clickButton('Sign up','Sign up');
    }
    async loginUser(username : string , password : string){
        await this.HeaderTabs('Log in').click();
        await this.popUp.fillSignInfields('username',username);
        await this.popUp.fillSignInfields('password',password);
        await this.popUp.clickButton('Log in','Log in');
    }
    async loggedinUserTag()
    {
        const textOfTag = await this.navbarUserIdentifier.textContent();
        return textOfTag;
    }
    chooseFilterCategory(fitler: string){
    return this.page.locator('.list-group').getByRole('link', { name: fitler });
    }
    async chooseItem(itemName: string){
        await this.page.getByRole('link', { name: itemName }).click();
    }
    async purchaseItem(typeofItem : 'Phones' | 'Laptops'|'Monitors' , name : string){
      
        await this.chooseFilterCategory(typeofItem).click();
        await this.chooseItem(name);
        await this.addToCartBtn.click();
        
            
    
    }

}