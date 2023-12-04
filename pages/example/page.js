import Page from "../../core/page.js";
import Button from "../../core/elements/button.js";
import Element from "../../core/elements/element.js";
import TextField from "../../core/elements/textField.js";

export default class ExamplePage extends Page {
    constructor(page) {
        super(page)
        this.url = "https://demo.evershop.io/"
    }

    init(page){
        super.init(page)
        /* / - homepage elements */
        this.shopKidsBtn = new Button('//span[contains(text(),"Shop kids")]', page)
        this.loginIcon = new Button('a[href*="/account"]', page)
        this.menNavbar = new Button('//a[contains(text(),"Men") and contains(@class,"nav-link")]', page)
        /* /account/login - login page elements */
        this.loginText = new Element('//*[contains(text(),"Login") and contains(@class,"text-center")]', page)
        this.emailInput = new TextField('input[name="email"]', page)
        this.passwordInput = new TextField('input[name="password"]', page)
        this.signInBtn = new Button('//span[contains(text(),"SIGN IN")]/parent::button', page)
        /* /men - men shoes page elements */
        this.firstItem = new Button('.listing-tem:nth-child(1)', page)
        this.blackColorCheckbox = new Button('//span[contains(text(),"Black")]/parent::a/*[@width]', page)
        this.fiterArrow = new Button('div.sort-direction.self-center', page)
        /* /men/${some_shoes_name} - first product page elements */
        this.productImg = new Element('#product-current-image', page)
    }
}