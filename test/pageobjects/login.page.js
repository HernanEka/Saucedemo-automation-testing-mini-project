import { $ } from "@wdio/globals";

class Login{

    get usernameInput () { return $('#user-name') }
    get passwordInput () { return $('#password') }
    get loginBtn () { return $('#login-button') }
    

    async loginProcess(username, password){

        await this.usernameInput.setValue(username)
        await this.passwordInput.setValue(password)
        await this.loginBtn.click()

    }

}

export default new Login()