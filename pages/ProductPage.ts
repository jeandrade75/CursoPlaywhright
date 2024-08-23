import{Page, Locator,expect} from '@playwright/test';
import Utils from '../commons/Utils';

export default class ProductPage {

    readonly page: Page;
    readonly utils: Utils;
    readonly productResultList : Locator;
    readonly viewProductFirstButton : Locator;
    readonly searchInputField : Locator;
    readonly submitSearch : Locator;
    readonly productTitle : Locator;
    readonly productImage : Locator;
    readonly overLayAddToCardButton : Locator;
    readonly continueShoppingModalButton : Locator;
    readonly viewCartModalButton : Locator;
   
    constructor (page: Page) {
        this.page = page;
        this.utils = new Utils(page);
        this.productResultList= page.locator('.product-image-wrapper')
        this.viewProductFirstButton = this.productResultList.first().locator('a[href^="/product_details/"]')
        this.searchInputField = page.locator('#search_product')
        this.submitSearch = page.locator('#submit_search')
        this.productTitle = this.productResultList.locator('.productinfo p')
        this.productImage = this.productResultList.locator('img')
        this.overLayAddToCardButton = page.locator('.overlay-content .add-to-cart')
        this.continueShoppingModalButton = page.getByRole('button', { name: 'Continue Shopping' })
        this.viewCartModalButton = page.getByRole('link', { name: 'View Cart' })

    }

    async visit(){

        await this.page.goto('https://www.automationexercise.com/products')
        await this.page.waitForLoadState()
        await this.utils.checkUrlContains('/products')
       
    }

    async closeAd(){

        //await this.page.waitForLoadState()
        //Trabajando con iframes y propagandas
        const isThereanAdd = await this.page.frameLocator('iframe[name^="aswift"][width=""]').locator('#ad_position_box').isVisible({timeout:10000})
        //console.log('Se muestra la propaganda?',isThereanAdd)
        if ( isThereanAdd){
          this.page.frameLocator('iframe[name^="aswift"][width=""]').frameLocator('iframe[name="ad_iframe"]').getByLabel('Close ad').click()
        }
    } 

    async addItemstoCar (numberOfElements : number){
        for (let i = 0; i < numberOfElements; i++) {
            await this.productImage.nth(i).hover();
            await this.page.waitForTimeout(1000)
            await this.overLayAddToCardButton.nth(i).click()
            if(i+1 == numberOfElements) {
                await this.viewCartModalButton.click()
            } else {
                await this.continueShoppingModalButton.click()
            }



            /* await productPage.productImage.first().hover(); // el hover lo que hace es poner el mouse sobre el elemento
            await page.waitForTimeout(1000);
            await productPage.overLayAddToCardButton.first().click();
            await productPage.continueShoppingModalButton.click();
            await productPage.productImage.nth(1).hover(); // el hover lo que hace es poner el mouse sobre el elemento
            await page.waitForTimeout(1000);
            await productPage.overLayAddToCardButton.nth(1).click();  */   
    }
}

    async searchForProduct(searchWord: string) {

        await this.searchInputField.fill(searchWord);
        await this.submitSearch.click();
        await this.page.waitForLoadState();

}

    async checkResultsContain(resultWord: string) {
        //Obtener la cantidad de resultados basandonos en su titulo
        const count = await this.productTitle.count();

        //Verificar que tenemos por lo menos un resultado
        expect(count).toBeGreaterThan(0);

        //Verficar que todos los titulos contengan la palabra "Top"
        for (let i = 0 ; i < count; i++){
            const text = await this.productTitle.nth(i).textContent();
            console.log ("El titulo del producto es:", text)
            expect(text).toContain(resultWord);
    }

}
    async addAllItemsToCart(){

        let amounOfItemsFound = await this.productTitle.count();
        await this.addItemstoCar(amounOfItemsFound)

    }

}
