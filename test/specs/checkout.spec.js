import { $, browser, expect } from "@wdio/globals";
import browserPage from "../pageobjects/browser.page.js";
import checkoutPage from "../pageobjects/checkout.page.js";

describe('CHECKOUT', function () {

    it('Add some product before testing', async function () {
        
        await browserPage.productPage()
        
        const addBtn1 = $('button[data-test="add-to-cart-sauce-labs-backpack"]')
        await addBtn1.click()

        const addBtn2 = $('button[data-test="add-to-cart-sauce-labs-bike-light"]')
        await addBtn2.click()

        const addBtn3 = $('button[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]')
        await addBtn3.click()

    })
    
    it('Fill all required information for checkout', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const checkTtitle = await $('span[data-test="title"]').getText()
        
        await expect(checkTtitle).toContain('Overview')

    })

    it('Fill all required information for checkout except firstname', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const getError = await $('h3[data-test="error"]').getText()

        await expect(getError).toContain("First Name is required")

    })

    it('Fill all required information for checkout except lastname', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const getError = await $('h3[data-test="error"]').getText()

        await expect(getError).toContain("Last Name is required")

    })

    it('Fill all required information for checkout except postal code', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const getError = await $('h3[data-test="error"]').getText()

        await expect(getError).toContain("Postal Code is required")

    })

    it('Click continue button withour filling any information form', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('','','')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const getError = await $('h3[data-test="error"]').getText()

        await expect(getError).toContain("First Name is required")

    })

    it('Check total item on the overview page is the same as the product counter in cart icon', async function () {
      
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const getItem = await $$('div[data-test="inventory-item"]')

        const increment = await cartBtn.$('span[data-test="shopping-cart-badge"]')
        const incrementText = await increment.getText()

        await expect(getItem.length).toEqual(parseInt(incrementText))

    })

    it('Check total item price on the overview page is the same as total of combined item price', async function () {
      
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const getItem = await $$('div[data-test="inventory-item-price"]')
        let totalItemPrice = 0

        for (let i = 0; i < getItem.length; i++) {
            totalItemPrice = totalItemPrice + parseFloat((await getItem[i].getText()).replace('$',''))
            
        }

        const subTotalLabel = await $('div[data-test="subtotal-label"]').getText()
        const subtotalValue = parseFloat(subTotalLabel.match(/[\d.]+/)[0]);

        await expect(subtotalValue).toEqual(totalItemPrice)

    })

    it('Check the tax is exactly 8% of the total item price', async function () {
      
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        // const getItem = await $$('div[data-test="inventory-item-price"]')
        // let totalItemPrice = 0

        // for (let i = 0; i < getItem.length; i++) {
        //     totalItemPrice = totalItemPrice + parseFloat((await getItem[i].getText()).replace('$',''))
            
        // }

        const subTotalLabel = await $('div[data-test="subtotal-label"]').getText()
        const subtotalValue = parseFloat(subTotalLabel.match(/[\d.]+/)[0]);

        const calculatedTax = (subtotalValue * 8/100).toFixed(2)        

        const taxOnPage = await $('div[data-test="tax-label"]').getText()
        const taxPriceonPage = taxOnPage.match(/[\d.]+/)[0]

        await expect(taxPriceonPage).toEqual(calculatedTax)

    })

    it('Check the total price is item total price plus tax cost', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const subTotalLabel = await $('div[data-test="subtotal-label"]').getText()
        const subtotalValue = parseFloat(subTotalLabel.match(/[\d.]+/)[0]);


        const taxOnPage = await $('div[data-test="tax-label"]').getText()
        const taxPriceonPage = parseFloat(taxOnPage.match(/[\d.]+/)[0])

        const totalPrice = (subtotalValue + taxPriceonPage).toFixed(2)

        const totalLabel = await $('div[data-test="total-label"]').getText()
        const totalValue = totalLabel.match(/[\d.]+/)[0]

        await expect(totalValue).toEqual(totalPrice)

    })

    it('Finish ordering by clicking the finish button', async function () {
        
        await browserPage.productPage()

        const cartBtn = $('a[data-test="shopping-cart-link"]')
        await cartBtn.click()

        const checkoutBtn = $('button[data-test="checkout"]')
        await checkoutBtn.click()

        await checkoutPage.inputInformation('hernanda','eka','53124')

        const continueBtn = $('#continue')
        await continueBtn.click()

        const finishBtn = $('#finish')
        await finishBtn.click()

        const completeMsg = await $('h2[data-test="complete-header"]')

        // await browser.pause(3000)

        await expect(completeMsg).toExist()

    })

})