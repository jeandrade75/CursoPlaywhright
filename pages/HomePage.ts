import{Page, Locator,expect} from '@playwright/test';
import DeleteAccountPage from './DeleteAccountPage';

export default class HomePage {

    readonly page: Page;
    readonly deleteAccountPage: DeleteAccountPage;
    readonly signUpLoginButton : Locator;
    readonly signUpHeader : Locator;
    readonly usernameText : Locator ;
    readonly logoutButton : Locator ;
    readonly contactUsButton : Locator;
    readonly productsButton : Locator;
    readonly deleteAccountButton : Locator;
    readonly cartButton: Locator;
    readonly womanCategoryLink : Locator;
    readonly menCategoryLink: Locator;
    readonly topsCategotyLink : Locator;
    readonly kidsCategoryLink: Locator;
    readonly mensJeansCategory : Locator;
    readonly brandLink : Locator;
    readonly recommendedSection: Locator;
    readonly recommendedProductListTitles: Locator;
    readonly subscriptionEmailInput : Locator;
    readonly subscriptionEmailButton : Locator;
    readonly scrollUpRowLink: Locator;
    
    constructor (page: Page) {
        this.page = page;
        this.deleteAccountPage = new DeleteAccountPage(page);
        this.signUpLoginButton = page.getByRole('link', { name: 'Signup / Login' })
        this.signUpHeader = page.getByRole('heading', { name: 'New User Signup!'})
        this.usernameText = page.getByText('Logged in as' , {exact:false})
        this.logoutButton = page.getByRole('link', { name: 'Logout' })
        this.contactUsButton = page.getByRole('link', { name: 'Contact Us' })
        this.productsButton = page.getByRole('link', { name: ' Products' })
        this.deleteAccountButton = page.getByRole('link', { name: ' Delete Account' })
        this.cartButton = page.getByRole('link', { name: ' Cart' })
        this.womanCategoryLink = page.getByRole('link', { name: ' Women' })
        this.menCategoryLink = page.getByRole('link', { name: ' Men' })
        this.kidsCategoryLink= page.getByRole('link', { name: ' Kids' })
        this.topsCategotyLink = page.getByRole('link', { name: 'Tops' })
        this.mensJeansCategory = page.locator('li').filter({ hasText: 'Jeans' })
        this.brandLink = page.locator('.brands-name a');
        this.recommendedSection = page.locator('.recommended_items');
        this.recommendedProductListTitles = page.locator('.recommended_items .item.active p');
        this.subscriptionEmailInput = page.locator('#subscribe_email');
        this.subscriptionEmailButton = page.locator('#subscribe');
        this.scrollUpRowLink = page.locator('#scrollUp');
        

    }

    async visit(){

        await this.page.goto('https://www.automationexercise.com/');
        await this.page.waitForLoadState()
        await expect(this.page).toHaveTitle ('Automation Exercise')

    }

    async gotoLoginEnSignUpPage(){

        await this.signUpLoginButton.click()
    }

    async checkUsername(username: string){

        await expect (this.usernameText).toBeVisible()
        await expect (this.usernameText).toContainText(username)

    }

    async logout(){
        await this.logoutButton.click()

    }

    async gotocontactUsPage(){
        await this.contactUsButton.click()
        expect(this.page.url()).toContain('contact_us')
    
    }

    async filterByBrand ( brand: string) {

        await this.brandLink.filter({hasText: brand}).click()
    }

    async deleteAccount(){

        await this.deleteAccountButton.click();
        await expect(this.page.getByText('Account Delete')).toBeVisible();
        await this.deleteAccountPage.continueButton.click();
        //await this.page.waitForLoadState();
        expect (this.page.url()).toBe('https://www.automationexercise.com/');

    }
    


}