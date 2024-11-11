import { $, $$, browser, expect } from "@wdio/globals";
import browserPage from "../pageobjects/browser.page.js";

describe('SORTING', function () {
    
    it('Sorting alphabetically from A to Z', async function () {
        
        await browserPage.productPage()

        const sortOpt = $('select[data-test="product-sort-container"]')
        await sortOpt.selectByAttribute('value','az')

        await browser.pause(4000)

        const allProduct = await $$('div[data-test="inventory-item-name"]')

        const productName = []

        for (let i = 0; i < allProduct.length; i++) {
            productName[i] = await allProduct[i].getText()
            
        }

        const sortedProductName = [...productName].sort()

        await expect(productName).toEqual(sortedProductName)

    })

    it('Sorting alphabetically from Z to A', async function () {
        
        await browserPage.productPage()

        const sortOpt = $('select[data-test="product-sort-container"]')
        await sortOpt.selectByAttribute('value','za')

        await browser.pause(4000)

        const allProduct = await $$('div[data-test="inventory-item-name"]')

        const productName = []

        for (let i = 0; i < allProduct.length; i++) {
            productName[i] = await allProduct[i].getText()
            
        }

        const sortedProductName = [...productName].sort().reverse()

        await expect(productName).toEqual(sortedProductName)

    })

    it('Sorting by price from lowest to highest', async function () {
        
        await browserPage.productPage()

        const sortOpt = $('select[data-test="product-sort-container"]')
        await sortOpt.selectByAttribute('value','lohi')

        await browser.pause(4000)

        const allProduct = await $$('div[data-test="inventory-item-price"]')

        const productName = []

        for (let i = 0; i < allProduct.length; i++) {
            productName[i] = parseFloat((await allProduct[i].getText()).replace('$',''))
            
        }

        const sortedProductName = [...productName].sort((a,b) => a - b)
        
        await expect(productName).toEqual(sortedProductName)

    })

    it('Sorting by price from highest to lowest', async function () {
        
        await browserPage.productPage()

        const sortOpt = $('select[data-test="product-sort-container"]')
        await sortOpt.selectByAttribute('value','hilo')

        await browser.pause(4000)

        const allProduct = await $$('div[data-test="inventory-item-price"]')

        const productName = []

        for (let i = 0; i < allProduct.length; i++) {
            productName[i] = parseFloat((await allProduct[i].getText()).replace('$',''))
            
        }

        const sortedProductName = [...productName].sort((a,b) => b - a)
        
        await expect(productName).toEqual(sortedProductName)

    })
    
})