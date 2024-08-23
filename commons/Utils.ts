import{Page, Locator, expect} from '@playwright/test';

export default class Utils {

    readonly page: Page;
    readonly isTextExact : false;
      
    
    constructor (page: Page) {
        this.page = page;
        this.isTextExact= false;
        
    }

    async checkTestIsVisible(text: string, isTextExact = this.isTextExact){
        await expect(this.page.getByText(text , {exact: isTextExact}).first()).toBeVisible()

    }

    async checkUrlContains(text:string){
        await this.page.waitForLoadState();
        expect(this.page.url()).toContain(text);

    }

    async scrollTo(direction:string){
        if(direction === 'top'){
            await this.page.evaluate(()=>window.scrollTo(0,0));
            } else {
                await this.page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight-1000));
                }
            await this.page.waitForTimeout(1000);

    }

}