import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import Utils from '../commons/Utils';
import ContacUsPage from '../pages/ContacUsPage';
//import exp from 'constants';


let homePage: HomePage;
let utils : Utils;
let contactusPage: ContacUsPage;

test.beforeEach ( async ({page}) =>{ // BeforeEach se ejecuta 1 vez antes de cada prueba
  homePage = new HomePage(page)
  utils = new Utils(page)
  contactusPage = new ContacUsPage(page)
  await homePage.visit() 
  
})

test('C6 - Formulario de contacto', async ({page}) => {
  // Interactuando con alertas y Dialogs

   await homePage.contactUsButton.click()
   await utils.checkTestIsVisible('GET IN TOUCH') 
   await contactusPage.nameInput.fill('Juan')
   await contactusPage.emailInput.fill('juan@gmail.com')
   await contactusPage.subjectInput.fill('Soy un cliente')
   await contactusPage.messageInput.fill('Hola, necesito ayuda')
   //await contactusPage.uploadFile('data\Testing.webp') //-- > OJO ACA NO ME ANDA EL SUBIR IMAGEN :: "BUSCAR SOLUCION"
   //await expect(contactusPage.findInput).toHaveText(/No file chosen\$/)
   
   // ** Aca generamos un listener -- > Es algo que esta esperando que un evento suceda
   await contactusPage.submitForm()
   await utils.checkTestIsVisible('Success! Your details have been submitted successfully.')
   await contactusPage.homeButton.click()
   await utils.checkUrlContains('https://www.automationexercise.com')
   
  
})

test('C25 - Ir hacia arriba con la flecha', async ({page}) => {
  
   await homePage.subscriptionEmailInput.scrollIntoViewIfNeeded();
   await homePage.scrollUpRowLink.click();
   await utils.checkTestIsVisible('Full-Fledged practice website for Automation Engineers');
   
})

test('C26- Ir hacia arriba y hacia abajo en la pagina', async ({page}) => {
  
  await utils.scrollTo("bottom");
  await expect(homePage.subscriptionEmailButton).toBeInViewport();
  await utils.scrollTo("top");
  await expect(page.getByText('Full-Fledged practice website for Automation Engineers').first()).toBeInViewport()
  //await utils.checkTestIsVisible('Full-Fledged practice website for Automation Engineers');
  
})
