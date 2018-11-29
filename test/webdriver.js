 // Error 
const webdriver = require('selenium-webdriver');
const safariDriver = require('selenium-webdriver/safari');
// const firefox = require('selenium-webdriver/firefox');

// let driver = new webdriver.Builder()
//     .forBrowser('firefox')
//     .setChromeOptions(/* ... */)
//     .setFirefoxOptions(/* ... */)
//     .build();

describe('百度首页UI 测试', function () {
  let driver;

  before(() => {
    driver = new webdriver.Builder()
    .forBrowser('safari')
    // .setSafariOptions(new safariDriver.Options()
    //   .addArguments(['headless']))
    .build();
  });

  it('should have title "百度一下，你就知道"', done => {
    driver.get('https://www.baidu.com').then(() => {
      driver.getTitle().then(title => {
        expect(title).toBe.equal('百度一下，你就知道 ')
        done();
      })
    })
  })

  after(() => {
    driver.quit();
  })
})