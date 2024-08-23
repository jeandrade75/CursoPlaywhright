import{Page, Locator,expect} from '@playwright/test';

export default class CheckoutPage {

    readonly page: Page;
    readonly deliveryDetails : Locator;
    readonly deliveryAddressFirtsNameText : Locator;
    readonly companyNameTxt : Locator;
    readonly addressText : Locator;
    readonly addressTwoText : Locator;
    readonly countryNameText : Locator;
    readonly phoneNumberText : Locator;
    readonly placeOrderButton : Locator;
    readonly billingDetails : Locator;
    readonly billingFirtsNameText : Locator;
    readonly billingCompanyNameText : Locator;
    readonly billingAddressText : Locator;
    readonly billingAddressTwoText : Locator;
    readonly billingCountryNameText : Locator;
    readonly billingPhoneNumberText : Locator;
    
    
    constructor (page: Page) {
        this.page = page;
        this.deliveryDetails = page.locator('#address_delivery')
        this.deliveryAddressFirtsNameText = this.deliveryDetails.locator('.address_firstname');
        this.companyNameTxt = page.locator('#address_delivery .address_address1').nth(0);
        this.addressText = page.locator('#address_delivery .address_address1').nth(1);
        this.addressTwoText = page.locator('#address_delivery .address_address1').nth(2);
        this.countryNameText = page.locator('#address_delivery .address_country_name');
        this.phoneNumberText = page.locator('#address_delivery .address_phone');
        this.placeOrderButton = page.getByRole('link', { name: 'Place Order' });
        
        this.billingDetails = page.locator('#address_invoice');
        this.billingFirtsNameText = this.billingDetails.locator('.address_firstname');
        this.billingCompanyNameText = this.billingDetails.locator('.address_address1').nth(0);
        this.billingAddressText = this.billingDetails.locator('.address_address1').nth(1);
        this.billingAddressTwoText = this.billingDetails.locator('.address_address1').nth(2);
        this.billingCountryNameText = this.billingDetails.locator('.address_country_name');
        this.billingPhoneNumberText = this.billingDetails.locator('.address_phone');


    }
    async checkDeliveryDetails(userData: any){

        await expect(this.deliveryAddressFirtsNameText).toHaveText(userData.prefix + " " + userData.fullName)
        await expect(this.companyNameTxt).toHaveText(userData.companyName)
        await expect(this.addressText).toHaveText(userData.address)
        await expect(this.addressTwoText).toHaveText(userData.address2)
        await expect(this.countryNameText).toHaveText(userData.country)
        //await expect(this.phoneNumberText).toHaveText(userData.mobilePhoneInput)

    }

    async checkBillingDetails (userData: any) {
        await expect(this.billingFirtsNameText).toHaveText(userData.prefix + " " + userData.fullName)
        await expect(this.billingCompanyNameText).toHaveText(userData.companyName)
        await expect(this.billingAddressText).toHaveText(userData.address)
        await expect(this.billingAddressTwoText).toHaveText(userData.address2)
        await expect(this.billingCountryNameText).toHaveText(userData.country)

            

    }


}