import{Page, Locator,expect} from '@playwright/test';
import Utils from '../commons/Utils';

export default class ProductDetailsPage {

    readonly page: Page;
    readonly utils: Utils;
    readonly productInformationContainer : Locator;
    readonly productDetailName : Locator;
    readonly productCategory : Locator;
    readonly productPrice : Locator;
    readonly availability : Locator;
    readonly productAbailibiliity : Locator;
    readonly productCondition : Locator;
    readonly productBrand : Locator;
    readonly quantityInput : Locator;
    readonly addtoCartButton : Locator;

            
    constructor (page: Page) {
        this.page = page;
        this.utils = new Utils(page);
        this.productInformationContainer = page.locator ('.product-information')
        this.productDetailName = this.productInformationContainer.locator('h2')
        this.productCategory = this.productInformationContainer.getByText('Category')
        this.productPrice = this.productInformationContainer.getByText('Rs.')
        this.availability = this.productInformationContainer.getByText('Availability')
        this.productAbailibiliity = this.productInformationContainer.getByText('Condition')
        this.productBrand = this.productInformationContainer.getByText('Brand')
        this.quantityInput = page.locator('#quantity')
        this.addtoCartButton = page.getByRole('button', { name: ' Add to cart' })
    }    

}