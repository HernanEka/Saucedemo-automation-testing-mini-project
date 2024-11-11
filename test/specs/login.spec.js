import { $, expect } from "@wdio/globals";
import browserPage from "../pageobjects/browser.page.js";
import loginPage from "../pageobjects/login.page.js";

describe('LOGIN', function () {
    
    it('Login with valid credentials', async function () {
        
        await browserPage.openPage()

        await loginPage.loginProcess('standard_user', 'secret_sauce')        

        const getTitle = await $('span[data-test="title"]').getText()

        await expect(getTitle).toContain('Products')
        
    })

    it('Login with invalid credentials', async function () {
        
        await browserPage.openPage()

        await loginPage.loginProcess('hernanda', 'secret_sauce')        

        const getTitle = await $('h3[data-test="error"]').getText()

        await expect(getTitle).toContain('Epic sadface: Username and password do not match any user in this service')
        
    })
    
    it('Login without input username', async function () {
        
        await browserPage.openPage()

        await loginPage.loginProcess('', 'secret_sauce')        

        const getTitle = await $('h3[data-test="error"]').getText()

        await expect(getTitle).toContain('Epic sadface: Username is required')
        
    })

    it('Login without input password', async function () {
        
        await browserPage.openPage()

        await loginPage.loginProcess('standard_user', '')        

        const getTitle = await $('h3[data-test="error"]').getText()

        await expect(getTitle).toContain('Epic sadface: Password is required')
        
    })

    it('Login without input anything', async function () {
        
        await browserPage.openPage()

        await loginPage.loginProcess('', '')        

        const getTitle = await $('h3[data-test="error"]').getText()

        await expect(getTitle).toContain('Epic sadface: Username is required')
        
    })

    it('Login with valid credentials but the account is lockedout', async function () {
        
        await browserPage.openPage()

        await loginPage.loginProcess('locked_out_user', 'secret_sauce')

        const getTitle = await $('h3[data-test="error"]').getText()

        await expect(getTitle).toContain('Epic sadface: Sorry, this user has been locked out.')
        
    })

})