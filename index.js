// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome.html

var webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new webdriver.Builder().forBrowser('chrome').build(); //创建一个chrome 浏览器实例
// var Options = new Options();
driver
  .manage()
  .window()
  .maximize();
driver.get('http://localhost:3000/#!/login').then(res => {
  // driver.windowSize({ height: 400, width: 400 });
  driver.takeScreenshot().then((image, err) => {
    require('fs').writeFile('./screenshot/login.png', image, 'base64', function(err) {
      console.log(err);
    });
  });
});

// var webdriver = require('selenium-webdriver');
// var chrome = require('selenium-webdriver/chrome');
// var path = require('chromedriver').path;

// var service = new chrome.ServiceBuilder(path).build();
// chrome.setDefaultService(service);
// // let chrome = require('selenium-webdriver/chrome');
// // let { Builder } = require('selenium-webdriver');

// let driver = new webdriver.Builder()
//   .forBrowser('chrome')
//   .setChromeOptions(new chrome.Options().headless())
//   .build();
