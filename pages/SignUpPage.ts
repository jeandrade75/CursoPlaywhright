import{Page, Locator,expect} from '@playwright/test';
import SignUpLoginPage from './SignUpLoginPage';
import AccountCreatedPage from './AccountCreatedPage';

export default class SignUpPage {

    readonly page: Page;
    readonly mrRadioButton: Locator;
    readonly passwordInput: Locator;
    readonly daysDropDown: Locator;
    readonly monthsDropDown: Locator;
    readonly yearsDropDown: Locator;
    readonly newsLetterCheckbox: Locator;
    readonly specialOfferCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly addressInput: Locator;
    readonly address2Input: Locator;
    readonly countryDropDown: Locator;
    readonly stateInput: Locator;
    readonly zipcodeInput: Locator;
    readonly cityInput: Locator;
    readonly mobilePhoneInput: Locator;
    readonly createAccountButton: Locator;
    readonly signUpLoginPage: SignUpLoginPage;
    readonly accountCreatedPage: AccountCreatedPage;

    constructor (page: Page) {
        this.page = page;
        this.signUpLoginPage = new SignUpLoginPage (page);
        this.accountCreatedPage = new AccountCreatedPage(page);
        this.mrRadioButton = page.getByText('Mr.')
        this.passwordInput = page.getByLabel('Password')
        this.daysDropDown = page.locator('#days')
        this.monthsDropDown = page.locator('#months')
        this.yearsDropDown = page.locator('#years')
        this.newsLetterCheckbox = page.getByLabel('Sign up for our newsletter!')
        this.specialOfferCheckbox = page.getByLabel('Receive special offers from')
        this.firstNameInput = page.getByLabel('First name')
        this.lastNameInput = page.getByLabel('Last name')
        this.companyInput = page.getByLabel('Company', { exact: true })
        this.addressInput = page.getByLabel('Address * (')
        this.address2Input = page.getByLabel('Address 2')
        this.countryDropDown = page.getByLabel('Country')
        this.stateInput = page.getByLabel('State')
        this.zipcodeInput = page.locator('#zipcode')
        this.cityInput = page.getByLabel('City *')
        this.mobilePhoneInput = page.getByLabel('Mobile Number *')
        this.createAccountButton = page.getByRole('button', { name: 'Create Account' })
     
    }

    async completeSigUp(userData: any) {

        await this.signUpLoginPage.signUpNameInput.fill(userData.fullName);
        const randomNumber= Math.floor(Math.random()*(999-10000)+1000);
        await this.signUpLoginPage.signUpEmailAdressInput.fill(userData.emailAddress + randomNumber + userData.emailDomain);
        await this.signUpLoginPage.signUpButton.click();
        await expect(this.page.getByText('Enter Account Information')).toBeVisible();
        await this.mrRadioButton.check();
        await this.passwordInput.fill(userData.password);
        await this.daysDropDown.selectOption(userData.DOB.day);
        await this.monthsDropDown.selectOption(userData.DOB.month);
        await this.yearsDropDown.selectOption(userData.DOB.year);
        await this.newsLetterCheckbox.click();
        await this.specialOfferCheckbox.click();
        await this.firstNameInput.fill(userData.firstName);
        await this.lastNameInput.fill(userData.lastName);
        await this.companyInput.fill(userData.companyName);
        await this.addressInput.fill(userData.address);
        await this.address2Input.fill(userData.address2);
        await this.countryDropDown.selectOption(userData.country);
        await this.stateInput.fill(userData.state);
        await this.cityInput.fill(userData.city);
        await this.zipcodeInput.fill(userData.zipCode);
        await this.mobilePhoneInput.fill(userData.mobilePhoneInput);
        await this.createAccountButton.click();
        await expect(this.page.getByText('Account Created!')).toBeVisible();
        await this.accountCreatedPage.continueButton.click();
        await expect(this.page.getByText('Logged in as '+ userData.fullName)).toBeVisible();


     
}};
