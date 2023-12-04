import Page from "../../core/page.js";
import Button from "../../core/elements/button.js";
import Element from "../../core/elements/element.js";

export default class CheckBoxPage extends Page {
    constructor(page) {
        super(page)
        this.url = "https://demoqa.com/checkbox"
    }

    init(page){
        super.init(page)
        this.homeCheckBox = new Button("label[for='tree-node-home']", page)
        this.homeSelectVerify = new Element("//*[@id='result']/span[text()='home']", page)
        this.checkBoxExpandHome = new Button("#tree-node > ol > li > span > button", page)
        this.checkBoxSelectVerify = new Element("//*[@id='result']/span[text()='public']", page)
        this.desktopCheckbox = new Button("//*[@id='tree-node']//span[text()='Desktop']", page)
        this.desktopCheckboxVerify = new Element("//*[@id='result']/span[text()='desktop']", page)
    }

}