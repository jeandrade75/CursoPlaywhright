import { test, expect } from '@playwright/test';
import Utils from '../commons/Utils';
import ProductPage from '../pages/ProductPage';
import ViewCartPage from '../pages/ViewCartPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import SignUpPage from '../pages/SignUpPage';
import * as testdata from '../tests/fixtures/TestData.json'
import HomePage from '../pages/HomePage';
import CheckoutPage from '../pages/CheckoutPage';
//import exp from 'constants';
import PaymentPage from '../pages/PaymentPage';
import DeleteAccountPage from '../pages/DeleteAccountPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
//import { sign } from 'crypto';

let utils : Utils;
let productPage: ProductPage;
let viewCartPage: ViewCartPage;
let productDetailsPage: ProductDetailsPage;
let signUpPage: SignUpPage;
let homePage: HomePage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;
let deleteAccountPage: DeleteAccountPage;
let signUpLoginPage: SignUpLoginPage;

test.beforeEach ( async ({page}) =>{ // BeforeEach se ejecuta 1 vez antes de cada prueba
  utils = new Utils(page);
  productPage = new ProductPage(page);
  viewCartPage = new ViewCartPage(page);
  productDetailsPage = new ProductDetailsPage(page);
  signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  checkoutPage = new CheckoutPage(page);
  paymentPage = new PaymentPage(page);
  deleteAccountPage = new DeleteAccountPage(page);
  signUpLoginPage = new SignUpLoginPage(page);

  await productPage.visit();
  //await page.goto('https://www.automationexercise.com/products')
  
})

test('C12 - Agregar mas de 1 elemento al carrito', async ({page}) => {
  
  await productPage.addItemstoCar(2);
  //await productPage.continueShoppinModalButton.click()
  //await productPage.viewCartModalButton.click()
  const amount = await viewCartPage.productRow.count();
  console.log ("Cantidad es:", amount)
  await expect(amount).toBe(2);
  await viewCartPage.getProductsDetails(amount)

})

  test('C13 - Verificar la cantidad de productos en el carrito de compras', async ({page}) => {
  
  await productPage.productResultList.first().locator('a[href^="/product_details/"]').click()
  await page.waitForLoadState()
  await productPage.closeAd()
  await utils.checkUrlContains('product_details')
  await productDetailsPage.quantityInput.fill('4')
  await productDetailsPage.addtoCartButton.click()
  await productPage.viewCartModalButton.click()
  await expect(viewCartPage.productRow.first().locator('.cart_quantity')).toHaveText('4')
  //await page.waitForTimeout(4000)
  
})

test('C14 - Crear orden : Registro DURANTE el checkout', async ({page}) => {
  
  await productPage.addItemstoCar(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await viewCartPage.signUpAndLoginCheckOutModalLink.click();
  await signUpPage.completeSigUp(testdata.usuarioNuevo);
  await homePage.cartButton.click();
  //await page.waitForLoadState()
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testdata.usuarioNuevo);
  await checkoutPage.placeOrderButton.click();
  await paymentPage.completePayment(testdata.paymentDetails);
  await utils.checkTestIsVisible('Congratulations! Your order has been confirmed!')
  /* await homePage.deleteAccountButton.click();
  await expect(page.getByText('Account Delete')).toBeVisible();
  await deleteAccountPage.continueButton.click();
  await page.waitForLoadState();
  expect (page.url()).toBe('https://www.automationexercise.com/');
   *///await page.waitForTimeout(4000);
  await homePage.deleteAccount();
})
  
test('C15 - Crear orden : Registro ANTES el checkout', async ({page}) => {
  
  await homePage.gotoLoginEnSignUpPage();
  await page.waitForLoadState();
  await signUpPage.completeSigUp(testdata.usuarioNuevo);
  await productPage.visit();
  await productPage.addItemstoCar(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testdata.usuarioNuevo);
  await checkoutPage.placeOrderButton.click();
  await paymentPage.completePayment(testdata.paymentDetails);
  await utils.checkTestIsVisible('Congratulations! Your order has been confirmed!')
  /* await homePage.deleteAccountButton.click();
  await expect(page.getByText('Account Delete')).toBeVisible();
  await deleteAccountPage.continueButton.click();
  await page.waitForLoadState();
  expect (page.url()).toBe('https://www.automationexercise.com/'); */
  //await page.waitForTimeout(4000);
  await homePage.deleteAccount();
})

test('C16 - Crear orden : Login antes del checkout', async ({page}) => {
  
  await homePage.gotoLoginEnSignUpPage();
  await signUpLoginPage.login(testdata.usuarioCreado.emailAddress, testdata.usuarioCreado.password);
  await homePage.checkUsername(testdata.usuarioCreado.userName);
  //await page.waitForLoadState();
  await productPage.visit();
  await page.waitForLoadState();
  await productPage.addItemstoCar(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testdata.usuarioCreado);
  await checkoutPage.placeOrderButton.click();
  await paymentPage.completePayment(testdata.paymentDetails);
  await utils.checkTestIsVisible('Congratulations! Your order has been confirmed!')
  
  //await page.waitForTimeout(4000);
})

test('C17 - Remove products From Cart / Version JEAN', async ({page}) => {
  
  await productPage.addItemstoCar(1);
  const amount = await viewCartPage.productRow.count();
  console.log ("Cantidad es:", amount)
  await expect(amount).toBe(1);
  await viewCartPage.getProductsDetails(amount)
  await page.locator('#product-1').getByRole('cell', { name: '' }).locator('a').click()
  await utils.checkTestIsVisible ('Cart is empty!')
  
  
})

test('C17 - Remove products From Cart / Version PROFE', async ({page}) => {
  
  await productPage.addItemstoCar(1);
  await utils.checkUrlContains('view_cart')
  await viewCartPage.deleteCartButton.click()
  await utils.checkTestIsVisible ('Cart is empty!')
  
  
})

test('C20 - Buscar productos y ver el carrito despues', async ({page}) => {
  
  await productPage.searchForProduct("Polo");
  await utils.checkUrlContains('products?search=Polo');
  await utils.checkTestIsVisible('Searched Products');
  await productPage.checkResultsContain ('Polo');
  await productPage.addAllItemsToCart();
  await homePage.cartButton.click();
  await viewCartPage.checkProductTitleContains('Polo');
  await homePage.gotoLoginEnSignUpPage();
  await signUpLoginPage.login(testdata.usuarioCreado.emailAddress, testdata.usuarioCreado.password)
  await homePage.checkUsername(testdata.usuarioCreado.userName);
  await homePage.cartButton.click();
  await viewCartPage.checkProductTitleContains('Polo');
  //await page.waitForTimeout(10000)
 
})

test('C21 - Dejar una reseña a un producto', async ({page}) => {
  expect((await productPage.productResultList.all()).length).toBeGreaterThan(0);
  await productPage.productResultList.first().locator('a[href^="/product_details/"]').click();
  await page.waitForLoadState();
  await productPage.closeAd();
  await utils.checkUrlContains('product_details');
  await utils.checkTestIsVisible('Write Your Review');
  await viewCartPage.submitAreview(testdata.reviewInfo);
  await utils.checkTestIsVisible('Thank you for your review');
  
})

test('C22- Agregar productos de seccion de recomendados ', async ({page}) => {
  await homePage.visit();
  await homePage.recommendedSection.scrollIntoViewIfNeeded();
  let productName;
  productName= await homePage.recommendedProductListTitles.first().textContent();
  await homePage.recommendedProductListTitles.first();
  await homePage.recommendedSection.locator('.item.active .fa-shopping-cart').first().click();
  await productPage.viewCartModalButton.click();
  await viewCartPage.checkProductTitleContains(productName);


  
})