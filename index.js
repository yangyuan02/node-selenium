// https://seleniumhq.github.io/selenium/docs/api/javascript/module/selenium-webdriver/chrome.html
const { Builder, By, Key, until, Button } = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var path = require('chromedriver').path;
var tesseract = require('tesseract.js');

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
  return await driver.get('http://localhost:3000/#!/index');
};

var recognition = async url => {
  console.log(url);
  return await tesseract.recognize(url);
};

var setFromValue = () => {
  var username = driver.findElement(By.name('userName')).sendKeys('sd_shengda');
  var password = driver.findElement(By.name('passWord')).sendKeys('shengda123456');
  var inputCode = driver.findElement(By.name('inputCode'));
  var loginBtn = driver.findElement(By.className('login-btn-box'));
  function deep() {
    if (!loginBtn) {
      return;
    }
    if (time) {
      clearTimeout(time);
    }
    var time = setTimeout(() => {
      driver
        .findElement(By.id('vCode'))
        .getAttribute('src')
        .then(data => {
          recognition(data).then(res => {
            console.log(res.text);
            inputCode.clear();
            inputCode.sendKeys(res.text);
            loginBtn.click(); // 点击登录
            setTimeout(() => {
              deep();
            }, 4000);
          });
        });
    }, 1000);
  }
  deep();
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
