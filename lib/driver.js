const chrome = require('selenium-webdriver/chrome');
const  { Capabilities, Builder } = require('selenium-webdriver');

const service = new chrome.ServiceBuilder('/mnt/e/work/olx-cli/bin/ChromeDriver.exe').build();

chrome.setDefaultService(service);

export default new Builder()
    .withCapabilities(Capabilities.chrome())
    .build();
