import { test, expect } from '@playwright/test';
//import exp from 'constants';
import HomePage from '../pages/HomePage';
//import LoginPage from '../pages/LoginPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import SignUpPage from '../pages/SignUpPage';
import AccountCreatedPage from '../pages/AccountCreatedPage';
import DeleteAccountPage from '../pages/DeleteAccountPage';
import * as testdata from '../tests/fixtures/TestData.json'
import Utils from '../commons/Utils';

let homepage: HomePage;
let signUpLoginPage : SignUpLoginPage;
let signUpPage : SignUpPage;
let accountCreatedPage : AccountCreatedPage;
let deleteAccountPage : DeleteAccountPage;
let utils : Utils;

test.beforeEach ( async ({page}) =>{ // BeforeEach se ejecuta 1 vez antes de cada prueba
  homepage = new HomePage(page)
  signUpLoginPage = new SignUpLoginPage(page)
  signUpPage = new SignUpPage(page)
  accountCreatedPage = new AccountCreatedPage(page)
  deleteAccountPage = new DeleteAccountPage(page)
  utils = new Utils(page)
  await homepage.visit() 
  await homepage.gotoLoginEnSignUpPage() 

})

test('C1 - Registro de usuario', async ({ page: page }) => {
  /* homepage = new HomePage(page)
  signUpLoginPage = new SignUpLoginPage(page) */
  await expect(homepage.signUpHeader).toBeVisible();
  await signUpPage.completeSigUp(testdata.usuarioNuevo);
  await homepage.deleteAccountButton.click();
  await expect(page.getByText('Account Delete')).toBeVisible();
  await deleteAccountPage.continueButton.click();
  await page.waitForLoadState();
  expect (page.url()).toBe('https://www.automationexercise.com/');
  
  //await page.goto('https://www.automationexercise.com/');
  //await expect(page).toHaveTitle ('Automation Exercise')
  //await page.goto('https://www.automationexercise.com/');
    
  //await homepage.signUpLoginButton.click() // aca pudimos comenzar a usar el POM 
  //await expect (homepage.signUpHeader).toBeVisible()
  //await expect(signUpPage.getByRole('heading', { name: 'New User Signup!' })).toBeVisible()
  /*await signUpLoginPage.signUpNameInput.fill('Jhon Doe')
  //await page.getByPlaceholder('Name').fill('Jhon Doe')
  const randomNumber= Math.floor(Math.random()*(999-10000)+1000)
  await signUpLoginPage.signUpEmailAdressInput.fill('iamjhondoe'+randomNumber+'@example.com')
  //await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill('iamjhondoe'+randomNumber+'@example.com')
  await signUpLoginPage.signUpButton.click()
  //await page.getByRole('button', { name: 'Signup' }).click()
  await expect(page.getByText('Enter Account Information')).toBeVisible()
  
  await signUpPage.mrRadioButton.check()
  await signUpPage.passwordInput.fill('123456')
  await signUpPage.daysDropDown.selectOption('10')
  await signUpPage.monthsDropDown.selectOption('10')
  await signUpPage.yearsDropDown.selectOption('1990')
  await signUpPage.newsLetterCheckbox.click()
  await signUpPage.specialOfferCheckbox.click()
  await signUpPage.firstNameInput.fill('Jhon')
  await signUpPage.lastNameInput.fill('Doe')
  await signUpPage.companyInput.fill('Company')
  await signUpPage.addressInput.fill('Address')
  await signUpPage.address2Input.fill('Address 2')
  await signUpPage.countryDropDown.selectOption('Canada')
  await signUpPage.stateInput.fill('Quebec')
  await signUpPage.cityInput.fill('Montreal')
  await signUpPage.zipcodeInput.fill('H1A 1A1')
  await signUpPage.mobilePhoneInput.fill('1234567890')
  await signUpPage.createAccountButton.click()
  await expect(page.getByText('Account Created!')).toBeVisible()
  await accountCreatedPage.continueButton.click()
  //await page.waitForTimeout(2000)
  await expect(page.getByText('Logged in as Jhon Doe')).toBeVisible() */
  /*await deleteAccountPage.continueButton.click()
  await expect(page.getByText('Account Delete')).toBeVisible()
  await deleteAccountPage.continueButton.click()
  await page.waitForLoadState()
  //expect(page.url)().toBe('https://www.automationexercise.com/')
  //await homepage.deleteAccountButton.click()
  //await expect(page.getByText('Account Delete')).toBeVisible()

   /* await page.getByLabel('Mr.').check()
  await page.getByLabel('Password *').fill('123456')
  await page.locator('#days').selectOption('10')
  await page.locator('#months').selectOption('10')
  await page.locator('#years').selectOption('1990')
  await page.getByText('Sign up for our newsletter!').check()
  await page.getByText('Receive special offers from').check()
  await page.getByLabel('First name').fill('Jhon')
  await page.getByLabel('Last name').fill('Doe')
  await page.getByLabel('Company', { exact: true }).fill('Some company')
  await page.getByLabel('Address * (Street address, P.').fill('1234 Main street')
  await page.getByLabel('Address 2').fill('Testing')
  await page.getByLabel('Country').selectOption('Canada')
  await page.getByLabel('State *').fill('Quebec')
  await page.getByLabel('City *').fill('Montreal')
  await page.locator('#zipcode').fill('1234')
  await page.getByLabel('Mobile Number *').fill('1234567896')
  await page.getByRole('button', { name: 'Create Account' }).click()
  await expect(page.getByText('Account Created!')).toBeVisible()
  await page.getByRole('link', { name: 'Continue' }).click()
  await expect(page.getByText('Logged in as Jhon Doe')).toBeVisible()
  await expect(page.getByRole('link', { name: ' Delete Account' })).toBeVisible()
  await page.getByRole('link', { name: ' Delete Account' }).click()
  await expect(page.getByText('Account Deleted!')).toBeVisible()
  await page.getByRole('link', { name: 'Continue' }).click()
   */
});

test('C2 - Inicio de sesion de usuario con usuario y contraseña correctos', async ({ page }) => {
  /* homepage = new HomePage(page)
  signUpLoginPage = new SignUpLoginPage(page) */
  // A PARTIR DE ACA APLICAMOS EL 1ER METODO (visit)
  // Ir a la pagina pricipal correctamente
  //await homepage.visit() 
  
  /* SUSTITUYE ESTE BLOQUE DE CODIGO-->  
  await page.goto('https://www.automationexercise.com/');
  await page.waitForLoadState()
  await expect(page).toHaveTitle ('Automation Exercise') */

  // A PARTIR DE ACA APLICAMOS EL 2DO METODO
  // Ir a la pagina de Login y Sign Up 
  //await homepage.gotoLoginEnSignUpPage() 

  //await homepage.signUpLoginButton.click()
  //await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible()
  
  // Me logueo con usuario y contraseña
  await signUpLoginPage.login(testdata.usuarioCreado.emailAddress,testdata.usuarioCreado.password)

  /* expect(signUpLoginPage.loginHeader).toBeVisible()
  //await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('corredoresbaires@gmail.com')
  await signUpLoginPage.loginEmailAdressInput.fill('corredoresbaires@gmail.com')
  //await page.getByPlaceholder('Password').fill('123456') 
  await signUpLoginPage.loginPasswordInput.fill('123456')
  //await page.getByRole('button', { name: 'Login' }).click()
  await signUpLoginPage.loginButton.click() */

  await homepage.checkUsername(testdata.usuarioCreado.userName);
  /* await expect (homepage.usernameText).toBeVisible()
  //await expect(page.getByText('Logged in as Juan Lopez')).toBeVisible()
  await expect (homepage.usernameText).toContainText('Juan Lopez')
  //await page.waitForTimeout(2000) // este lo usamos para dar un tiempo a que cargue la pagina de sign up/login
   */
});

test('C3 - Inicio de sesion de usuario con usuario y contraseña incorrectos', async ({ page }) => {
  /* homepage = new HomePage(page)
  signUpLoginPage = new SignUpLoginPage(page) */
  //utils = new Utils(page)
  //await homepage.visit()
  /* await page.goto('https://www.automationexercise.com/');
  await page.waitForLoadState()
  await expect(page).toHaveTitle ('Automation Exercise') */
  //await homepage.signUpLoginButton.click()
  //await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible()
  
  // Me logueo con usuario y contraseña
  await signUpLoginPage.checkLoginHeader()
  await signUpLoginPage.login(testdata.usuarioCreado.emailAddress,'pass')
  /*await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('correNovalido@gmail.com')
  await signUpLoginPage.loginEmailAdressInput.fill('correNovalido@gmail.com')
  //await page.getByPlaceholder('Password').fill('123456') 
  await signUpLoginPage.loginPasswordInput.fill('123456')
  //await page.getByRole('button', { name: 'Login' }).click()
  await signUpLoginPage.loginButton.click() */
  //await expect(page.getByText('Your email or password is incorrect!')).toBeVisible()
  //await utils.checkTestIsVisible('Your email or password is incorrect!')
  //await page.waitForTimeout(2000) // este lo usamos para dar un tiempo a que cargue la pagina de sign up/login
  
});

test('C4 - Cierre de sesion de usuario', async ({ page }) => {
  /* homepage = new HomePage(page)
  signUpLoginPage = new SignUpLoginPage(page) */
  //await homepage.visit()
  /* await page.goto('https://www.automationexercise.com/');
  await page.waitForLoadState()
  await expect(page).toHaveTitle ('Automation Exercise') */
  //await homepage.signUpLoginButton.click()
  
  //await expect(page.getByRole('heading', { name: 'Login to your account' })).toBeVisible()
  // Me logueo con usuario y contraseña
  //await signUpLoginPage.login('corredoresbaires@gmail.com','123456')
  /* expect(signUpLoginPage.loginHeader).toBeVisible()
  //await page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder('Email Address').fill('corredoresbaires@gmail.com')
  await signUpLoginPage.loginEmailAdressInput.fill('corredoresbaires@gmail.com')
  //await page.getByPlaceholder('Password').fill('123456') 
  await signUpLoginPage.loginPasswordInput.fill('123456')
  //await page.getByRole('button', { name: 'Login' }).click()
  await signUpLoginPage.loginButton.click() */
  //await expect (homepage.usernameText).toBeVisible()
  //await expect (homepage.usernameText).toContainText('Juan Lopez')
  //await expect(page.getByText('Logged in as Juan Lopez')).toBeVisible()
  //await page.getByRole('link', { name: ' Logout' }).click()
  //await homepage.visit() 
  //await homepage.gotoLoginEnSignUpPage()
  await signUpLoginPage.login(testdata.usuarioCreado.emailAddress,testdata.usuarioCreado.password)
  await homepage.checkUsername(testdata.usuarioCreado.userName);
  await homepage.logout()
  await utils.checkUrlContains('/login')
  //await homepage.logoutButton.click()
  //await page.waitForURL('https://www.automationexercise.com/login',{timeout:2000})
  //expect(page.url()).toBe('https://www.automationexercise.com/login')
  //await page.waitForTimeout(2000) // este lo usamos para dar un tiempo a que cargue la pagina de sign up/login
  
});

test('C5 - Registro de usuario con correo electronico ya existente', async ({ page }) => {
  //homepage = new HomePage(page)
  //signUpLoginPage = new SignUpLoginPage(page)
  //utils = new Utils (page)
  //await homepage.visit()
  //await homepage.gotoLoginEnSignUpPage()
  await signUpLoginPage.signUp(testdata.usuarioCreado.userName , testdata.usuarioCreado.emailAddress)
  //await signUpLoginPage.signUpButton.click() 
  await utils.checkTestIsVisible('Email Address already exist!')
  
  /* await page.goto('https://www.automationexercise.com/');
  await page.waitForLoadState()
  await expect(page).toHaveTitle ('Automation Exercise')
  await homepage.signUpLoginButton.click() */ // aca pudimos comenzar a usar el POM 

  /* await signUpLoginPage.signUpNameInput.fill('Jhon Doe')
  await signUpLoginPage.signUpEmailAdressInput.fill('corredoresbaires@gmail.com')
  await signUpLoginPage.signUpButton.click() */
  //await expect(page.getByText('Email Address already exist!')).toBeVisible()
  


});