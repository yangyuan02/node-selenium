// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome.html
const { Builder, By, Key, until, Button } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;

var service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

var driver = new Builder().forBrowser('chrome').build(); //创建一个chrome 浏览器实例

var windowMax = () => {
  // 窗口最大化
  driver
    .manage()
    .window()
    .maximize();
};

var open = async () => {
  // 打开浏览器
  return await driver.get('http://localhost:3000/#!/login');
};
var setFromValue = () => {
  var username = driver.findElement(By.name('userName')).sendKeys('sd_shengda');
  var password = driver.findElement(By.name('passWord')).sendKeys('shengda123456');
  driver.findElement(By.className('login-btn-box')).click(); // 点击登录
  createImags();
};
var takeScreenshot = async () => {
  // 截屏任务
  return await driver.takeScreenshot();
};
var utilsImags = (image, url) => {
  require('fs').writeFile(url, image, 'base64', function(err) {
    console.log(err);
  });
};
var createImags = () => {
  takeScreenshot().then((image, err) => {
    utilsImags(image, './screen/login.png');
  });
};

var screen = () => {
  open().then(res => {
    setFromValue();
  });
};

var init = () => {
  windowMax();
  screen();
};

init();
