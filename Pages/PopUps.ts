import {Locator , Page} from '@playwright/test'
import { HomePage } from './homePage';

export class PopUp {
    readonly page : Page;

constructor(page:Page){
    this.page= page;
}
//filling Fields while signup
async fillSignUpfields(fieldNeeded: 'username' | 'password' , text: string)
{
    await this.page.locator(`#sign-${fieldNeeded}`).fill(text);
}
//filling Fields while signin
async fillSignInfields(fieldNeeded: 'username' | 'password' , text: string)
{
    await this.page.locator(`#login${fieldNeeded}`).fill(text);
}
async chooseTab(buttonName: 'Sign up' | 'Close' | 'Log in' | 'Send message'){
    let buttonNeeded = this.page.locator('.modal-footer').getByRole('button' , {name : buttonName});
    await buttonNeeded.click();
}
async clickButton(popUp : 'Log in'|'Sign up',buttonName : 'Close' |'Log in' | 'Sign up' ){
   await this.page.getByLabel(popUp).getByRole('button',{name: buttonName}).click();
}

}