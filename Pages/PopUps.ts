import {Locator , Page} from '@playwright/test'
import { HomePage } from './homePage';

export class PopUp {
    readonly page : Page;
    readonly placeOrderTotal : Locator;
    readonly purchaseBtn : Locator;
    readonly orderSuccessPopUp: Locator;
constructor(page:Page){
    this.page= page;
    this.placeOrderTotal = this.page.locator('#totalm');
    this.purchaseBtn = this.page.getByRole('button', { name: 'Purchase' });
    this.orderSuccessPopUp = this.page.locator('.sweet-alert.showSweetAlert.visible');
}
// filling Fields while signup
async fillSignUpfields(fieldNeeded: 'username' | 'password' , text: string)
{
    await this.page.locator(`#sign-${fieldNeeded}`).fill(text);
}
// filling Fields while signin
async fillSignInfields(fieldNeeded: 'username' | 'password' , text: string)
{
    await this.page.locator(`#login${fieldNeeded}`).fill(text);
}
// Clicks a button in the modal footer by name
async chooseTab(buttonName: 'Sign up' | 'Close' | 'Log in' | 'Send message'){
    let buttonNeeded = this.page.locator('.modal-footer').getByRole('button' , {name : buttonName});
    await buttonNeeded.click();
}
// Clicks a button inside a labeled popup
async clickButton(popUp : 'Log in'|'Sign up',buttonName : 'Close' |'Log in' | 'Sign up' ){
   await this.page.getByLabel(popUp).getByRole('button',{name: buttonName}).click();
}

// Fills the place order form with provided data
async fillPlaceOrderForm(data: {
    name: string;
    country: string;
    city: string;
    card: string;
    month: string;
    year: string;
  }) {
        for (const [fieldId, value] of Object.entries(data)) {
          await this.page.fill(`#${fieldId}`, value);
        }
  }
// Submits the order by clicking the purchase button
async submitOrder(){
    await this.purchaseBtn.click();
}
// Waits for and returns the order success dialog details
async successDialogDetails(){
    await this.orderSuccessPopUp.waitFor({'state':'visible'});
    const successMsgDetails = await this.orderSuccessPopUp.locator('.lead.text-muted').textContent();
    return successMsgDetails;
}
// Returns the locator for the order success icon
orderSuccessIcon(){
  return  this.page.locator('.sa-icon.sa-success');
}
}