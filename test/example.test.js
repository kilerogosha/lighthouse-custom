import logger from "../logger/logger.js";
import ExamplePage from '../pages/example/page.js';
import LighthouseBrowser from '../core/browser.js';
import CreateReport from '../reporting/createReport.js';

const args = process.argv;
const browserType = args.includes("--desktop") ? "desktop" : "mobile",
    headless = args.includes("--headless") ? true : false,
    browserLocationIndex = args.indexOf("--browserLocation"),
    browserLocation = browserLocationIndex !==-1 ? args[browserLocationIndex + 1] : undefined,
    browser = new LighthouseBrowser(browserType, headless, browserLocation),
    Page = new ExamplePage(),
    testTime = 100000;

before(async function () {
    await browser.init();
    await browser.start();
    browser.page.isSuccess = true; // Track failed actions (any fail working with actions sets this to false)
    Page.init(browser.page); // Sets instance of puppeteer page to Page page object
});

// Check if prev flow finished successfully before launching test
beforeEach(async function () {
    logger.debug("[STARTED] " + this.currentTest.fullTitle());
    this.timeout(testTime);
    if (browser.flow.currentTimespan) {  // happens if waiting inside actions exceeds "testTime" timeout
        await browser.flow.endTimespan() // stopping active timespan if not stopped by timeout
        browser.page.isSuccess = false
        throw new Error('Skipping test because previous flow exceeded testTime limit: ' + testTime);
    }
    else if (!browser.page.isSuccess)
        throw new Error('Skipping test because previous flow failed');
});

afterEach(async function () {
    logger.debug("[ENDED] " + this.currentTest.title);
});

after(async function () {
    this.timeout(60000);
    if (browser.flow.currentTimespan) {  // happens if waiting inside actions exceeds "testTime" timeout
        await browser.flow.endTimespan(); // stopping active timespan if not stopped by timeout
        browser.page.isSuccess = false;
    }
    await browser.flow.snapshot({ name: 'Capturing last state of the test' });
    await new CreateReport().createReports(browser.flow, browserType);
    await browser.closeBrowser();
});


it("[ColdNavigation] Check " + Page.url, async function () {
    await browser.coldNavigation("Open main page", Page.url)
}).timeout(testTime);

it("[ColdNavigation] Open login page", async function () {
    await Page.loginIcon.click()
    await Page.loginText.find()
    await browser.waitTillRendered()
    await browser.coldNavigation("Open login page")
}).timeout(testTime);

it("[ColdNavigation] Click on 'Sign in' button", async function () {
    await Page.emailInput.type("sanya@gmail.com")
    await Page.passwordInput.type("sanya")
    await Page.signInBtn.find()
    await Page.signInBtn.click()
    await Page.shopKidsBtn.find()
    await browser.waitTillRendered()
    await browser.coldNavigation("Click on 'Sign in' button")
}).timeout(testTime);

it("[ColdNavigation] Open 'men' page", async function () {
    await Page.menNavbar.click()
    await Page.firstItem.find()
    await browser.waitTillRendered()
    await browser.coldNavigation("Open 'men' page")
}).timeout(testTime);

it("[Timespan] Click on filter arrow", async function () {
    await browser.flow.startTimespan({ name: "Click on filter arrow" })
    await Page.fiterArrow.click()
    await Page.firstItem.find()
    await browser.waitTillRendered()
    await browser.flow.endTimespan()
}).timeout(testTime);

it("[Timespan] Click on 'black' color checkbox", async function () {
    await browser.flow.startTimespan({ name: "Click on 'black' color checkbox" })
    await Page.blackColorCheckbox.click()
    await Page.firstItem.find()
    await browser.waitTillRendered()
    await browser.flow.endTimespan()
}).timeout(testTime);

it("[ColdNavigation] Open first item", async function () {
    await Page.firstItem.click()
    await Page.productImg.find()
    await browser.waitTillRendered()
    await browser.coldNavigation("Open first item")
}).timeout(testTime);