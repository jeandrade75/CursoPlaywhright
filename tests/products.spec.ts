import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import Utils from '../commons/Utils';
import ContacUsPage from '../pages/ContacUsPage';
//import exp from 'constants';
import ProductPage from '../pages/productPage';
//import exp from 'constants';
import ProductDetailsPage from '../pages/ProductDetailsPage';
import exp from 'constants';
//import exp from 'constants';


let homePage: HomePage;
let utils : Utils;
let contactusPage: ContacUsPage;
let productPage: ProductPage;
let productDetailsPage: ProductDetailsPage;

test.beforeEach ( async ({page}) =>{ // BeforeEach se ejecuta 1 vez antes de cada prueba
  homePage = new HomePage(page)
  utils = new Utils(page)
  contactusPage = new ContacUsPage(page)
  productPage = new ProductPage(page)
  productDetailsPage = new ProductDetailsPage(page)
  await productPage.visit()
  //await page.goto('https://www.automationexercise.com/products')
  
})

//Clase:: "Filtrando elementos anidados"
//Clase:: "Trabajando con iframes y propagandas"

test('C8 - Verificar todos los productos y la pagina de detalle de productos', async ({page}) => {
  //expect((await page.locator('.product-image-wrapper').all()).length).toBeGreaterThan(0)
  // aca podemos listar cuantos elementos similares hay (cajitas de productos)
  expect((await productPage.productResultList.all()).length).toBeGreaterThan(0)
  await productPage.productResultList.first().locator('a[href^="/product_details/"]').click()
  await page.waitForLoadState()
  await productPage.closeAd()
  await utils.checkUrlContains('product_details')
  await expect(productDetailsPage.productDetailName).toBeVisible
  await expect(productDetailsPage.productCategory).toBeVisible
  await expect(productDetailsPage.productPrice).toBeVisible
  await expect(productDetailsPage.productAbailibiliity).toBeVisible
  await expect(productDetailsPage.productCondition).toBeVisible
  await expect(productDetailsPage.productBrand).toBeVisible
  await page.waitForTimeout(5000)
  
})

test.skip ('C9 - Verificar que la funcionalidad de busqueda devuelva resultados esperados', async ({page})  => {
  await productPage.searchInputField.fill('top')
  await productPage.submitSearch.click()
  await page.waitForLoadState()
  await utils.checkUrlContains('products?search=top')
  // Aca vamos a obtener la cantidad de resultados basandonos en su titulo
  const count = await productPage.productTitle.count()
  // Ver que tenemos por los menos 1 resultado
  expect(count).toBeGreaterThan(0)
  // Verificar que todos los titulos contengan la palabra "Top"
  for (let i = 0; i < count; i++) {
    const text = await productPage.productTitle.nth(i).textContent()
    console.log("El titulo del producto es", text,)
    expect(text).toContain('Top')}

    await page.waitForTimeout(6000)

})

test('C18 - View Category Products -WOMAN', async ({page}) => {
  
  await homePage.womanCategoryLink.click({force:true})
  await homePage.topsCategotyLink.click()
  await productPage.closeAd()
  await utils.checkTestIsVisible('WOMEN -  TOPS PRODUCTS')
  
})

test('C18-1 - View Category Products -MEN', async ({page}) => { // FALLIDO 
  
  await homePage.menCategoryLink.click({force:true})
  await homePage.mensJeansCategory.click()
  await productPage.closeAd()
  await utils.checkTestIsVisible('MEN - JEANS PRODUCTS')
  
})
test('C19 - Ver carrito y marcas de productos', async ({page}) => {
  
  await homePage.filterByBrand('POLO');
  await productPage.closeAd();
  await utils.checkUrlContains('Polo');
  await homePage.filterByBrand('MADAME');
  await productPage.closeAd();
  await utils.checkUrlContains('Madame');
  await expect(await productPage.productResultList.count()).toBeGreaterThan(0);
  

})

