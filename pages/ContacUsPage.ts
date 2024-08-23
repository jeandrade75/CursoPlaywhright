import{Page, Locator} from '@playwright/test';


export default class ContacUsPage {

    readonly page: Page;
    readonly nameInput: Locator;
    readonly emailInput: Locator;
    readonly subjectInput: Locator;
    readonly messageInput: Locator;
    readonly findInput: Locator;
    readonly submitButton: Locator;
    readonly homeButton: Locator;
    
    
    constructor (page: Page) {
        this.page = page;
        this.nameInput = page.getByPlaceholder('Name')
        this.emailInput = page.getByPlaceholder('Email', { exact: true })
        this.subjectInput = page.getByPlaceholder('Subject')
        this.messageInput = page.getByPlaceholder('Your Message Here')
        this.findInput = page.locator('input[name="upload_file"]')
        this.submitButton = page.getByRole('button', { name: 'Submit' })
        this.homeButton = page.locator('#form-section a')
           
    }

    async uploadFile(filePath : string){
        //await this.page.setInputFiles('input[name="upload_file"]',filePath)
        await this.page.setInputFiles('input[name="upload_file"]',filePath)


    }

    async submitForm(){
        this.page.on('dialog', dialog => dialog.accept()) // aca creamos el listener
        this.submitButton.click() // esta es la accion que va a ejecutar el dialog 

    
    }
}