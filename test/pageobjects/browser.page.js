import { $, browser } from "@wdio/globals";

class Browser{

    async openPage(){

        await browser.url('https://www.saucedemo.com/')

    }

    async productPage(){
        
        await browser.url('https://www.saucedemo.com/')
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()

    }

}

export default new Browser()