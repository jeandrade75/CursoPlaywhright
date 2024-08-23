import { test, expect } from '@playwright/test';
import Utils from '../commons/Utils';
import ProductPage from '../pages/ProductPage';
import ViewCartPage from '../pages/ViewCartPage';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import SignUpPage from '../pages/SignUpPage';
import * as testdata from '../tests/fixtures/TestData.json'
import HomePage from '../pages/HomePage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';
import DeleteAccountPage from '../pages/DeleteAccountPage';
import SignUpLoginPage from '../pages/SignUpLoginPage';
import PaymentDonePage from '../pages/PaymentDonePage';

let utils: Utils;
let productPage: ProductPage;
let viewCartPage: ViewCartPage;
let productDetailsPage: ProductDetailsPage;
let signUpPage: SignUpPage;
let homePage: HomePage;
let checkoutPage: CheckoutPage;
let paymentPage: PaymentPage;
let deleteAccountPage: DeleteAccountPage;
let signUpLoginPage: SignUpLoginPage;
let paymentDonePage: PaymentDonePage;

test.beforeEach ( async ({page}) =>{ // BeforeEach se ejecuta 1 vez antes de cada prueba
  utils= new Utils(page);
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
  
})

test('C23 Verificar detalles de direccion en la checkout page', async ({page}) => {
  await homePage.gotoLoginEnSignUpPage()
  await signUpPage.completeSigUp(testdata.usuarioNuevo);
  await productPage.visit();
  await productPage.addItemstoCar(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testdata.usuarioNuevo);
  await checkoutPage.checkBillingDetails(testdata.usuarioNuevo);
  await homePage.deleteAccount();
  
})

test('C24 Descargar recibo despues de hacer la compra', async ({page}) => {
  await productPage.addItemstoCar(1);
  await viewCartPage.proceedToCheckoutButton.click();
  await viewCartPage.signUpAndLoginCheckOutModalLink.click();
  await signUpPage.completeSigUp(testdata.usuarioNuevo);
  await homePage.cartButton.click();
  //await page.waitForLoadState()
  await viewCartPage.proceedToCheckoutButton.click();
  await checkoutPage.checkDeliveryDetails(testdata.usuarioNuevo);
  await checkoutPage.checkBillingDetails(testdata.usuarioNuevo);
  await checkoutPage.placeOrderButton.click();
  await productPage.closeAd();
  await paymentPage.completePayment(testdata.paymentDetails);
  await utils.checkTestIsVisible('Congratulations! Your order has been confirmed!');
  await paymentDonePage.downloadInvoce();

  
})