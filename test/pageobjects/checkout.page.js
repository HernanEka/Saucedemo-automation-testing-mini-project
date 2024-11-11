import { $ } from "@wdio/globals";

class Checkout{

    get firstnameInput () { return $('#first-name') }
    get lastnameInput () { return $('#last-name') }
    get postalCodeInput () { return $('#postal-code') }

    async inputInformation(firstname, lastname, postalCode){

        await this.firstnameInput.setValue(firstname)
        await this.lastnameInput.setValue(lastname)
        await this.postalCodeInput.setValue(postalCode)

    }

}

export default new Checkout()