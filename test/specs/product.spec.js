import { $, $$, browser, expect } from "@wdio/globals";
import browserPage from "../pageobjects/browser.page.js";


describe('PRODUCT', function () {

    it('Check product title on product detail', async function () {

        await browserPage.productPage()

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()
        const getProductTitleMenu = await productTitleMenu.getText()

        const productTitleDetail = await $('div[data-test="inventory-item-name"]').getText()

        await expect(productTitleDetail).toEqual(getProductTitleMenu)

    })

    it('Check product description on product detail', async function () {

        await browserPage.productPage()

        const productDescMenu = $('div[data-test="inventory-item-desc"]')
        const getProductDescMenu = await productDescMenu.getText()

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()

        const productDescDetail = await $('div[data-test="inventory-item-desc"]').getText()

        await expect(productDescDetail).toEqual(getProductDescMenu)

    })

    it('Check product price on product detail', async function () {

        await browserPage.productPage()

        const productPriceMenu = $('div[data-test="inventory-item-price"]')
        const getProductPriceMenu = await productPriceMenu.getText()

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()

        const productPriceDetail = await $('div[data-test="inventory-item-price"]').getText()

        await expect(productPriceDetail).toEqual(getProductPriceMenu)

    })

    it('Check product image on product detail', async function () {

        await browserPage.productPage()

        const productImageMenu = await $('img[data-test="inventory-item-sauce-labs-backpack-img"]')
        const getProductImageMenu = await productImageMenu.getAttribute('src')

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()

        const productImageDetail = await $('img[data-test="item-sauce-labs-backpack-img"]').getAttribute('src')

        await expect(productImageDetail).toEqual(getProductImageMenu)

    })

    it('Add product to cart from product detail by clicking "Add to cart" button', async function () {

        await browserPage.productPage()

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()

        const addBtn = $('button[data-test="add-to-cart"]')
        await addBtn.click()

        const cekincrement = $('a[data-test="shopping-cart-link"]')
        const increment = cekincrement.$('span[data-test="shopping-cart-badge"]')

        await expect(increment).toBeDisplayed()

    })

    it('Check button "Add to Cart" changed to "Remove" after adding product to cart', async function () {

        await browserPage.productPage()

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()

        const removeBtn = $('button[data-test="remove"]')

        await expect(removeBtn).toExist()

    })

    it('Remove product from cart from product detail by clicking "Remove" button', async function () {

        await browserPage.productPage()

        const productTitleMenu = $('div[data-test="inventory-item-name"]')
        await productTitleMenu.click()

        const removeBtn = $('button[data-test="remove"]')
        await removeBtn.click()

        const cekincrement = $('a[data-test="shopping-cart-link"]')
        const increment = await cekincrement.$('span[data-test="shopping-cart-badge"]')

        await expect(increment).not.toBeDisplayed()

    })

    it('Adding product to cart from product menu by clicking "Add to Cart" button', async function () {

        await browserPage.productPage()

        const addBtn = $('button[data-test="add-to-cart-sauce-labs-backpack"]')
        await addBtn.click()

        const cekincrement = $('a[data-test="shopping-cart-link"]')
        const increment = await cekincrement.$('span[data-test="shopping-cart-badge"]')

        await expect(increment).toBeDisplayed()

    })

    it('Remove product from cart from product menu by clicking "Remove" button', async function () {

        await browserPage.productPage()

        const addBtn = $('button[data-test="add-to-cart-sauce-labs-bike-light"]')
        await addBtn.click()

        const cekincrement = $('a[data-test="shopping-cart-link"]')
        const increment = await cekincrement.$('span[data-test="shopping-cart-badge"]')
        const incrementText = await increment.getText()

        const removeBtn = $('button[data-test="remove-sauce-labs-bike-light"]')
        await removeBtn.click()

        const cekincrementAfter = $('a[data-test="shopping-cart-link"]')
        const incrementAfter = await cekincrementAfter.$('span[data-test="shopping-cart-badge"]')
        const incrementAfterText = await incrementAfter.getText()

        await expect(parseInt(incrementAfterText)).toEqual(parseInt(incrementText) - 1)
    })

    it('Check Added product on cart', async function () {

        await browserPage.productPage()

        const addBtn = $('button[data-test="add-to-cart-sauce-labs-bike-light"]')
        await addBtn.click()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const daftarProduk = await $$('div[data-test="inventory-item-name"]')

        const newestProduk = await daftarProduk[daftarProduk.length - 1].getText()

        await expect(newestProduk).toEqual('Sauce Labs Bike Light')

    })

    it('Remove All product from the cart', async function () {

        await browserPage.productPage()

        const addBtn = $('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
        await addBtn.click()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const daftarProduk = await $$('div[data-test="inventory-item"]')

        for (let i = 0; i < daftarProduk.length; i++) {
            const btnRemove = $('.btn_secondary.cart_button')
            await btnRemove.click()

        }

        const cekincrement = $('a[data-test="shopping-cart-link"]')
        const increment = await cekincrement.$('span[data-test="shopping-cart-badge"]')

        await expect(increment).not.toBeDisplayed()
    })
})