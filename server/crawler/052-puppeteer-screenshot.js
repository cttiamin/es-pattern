// 爬取页面,
const puppeteer = require('puppeteer')
const { mn, screenshot } = require('./052-config')
const srcToImg = require('./052-srcToimg');
// 百度首页截屏
;(async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://www.baidu.com')
  await page.screenshot({
    path: `${screenshot}/${Date.now()}.png`
  })
  await browser.close()
})()

// 百度图搜索
// ;(async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://image.baidu.com/');
//   console.log('go to https://image.baidu.com/');

//   await page.setViewport({
//     width: 1920,
//     height: 1080
//   });
//   console.log('reset viewport');

//   await page.focus('#kw');
//   await page.keyboard.sendCharacter('狗');
//   await page.click('.s_btn');
//   console.log('go to search list');

//   page.on('load', async () => {
//     console.log('page loading done, start fetch...');

//     const srcs = await page.evaluate(() => {
//       const images = document.querySelectorAll('img.main_img');
//       return Array.prototype.map.call(images, img => img.src);
//     });
//     console.log(`get ${srcs.length} images, start download`);

//     // srcs.forEach(async (src) => {
//       // sleep
//       // await page.waitFor(200);
//       // await srcToImg(src, mn);
//     // });
    
//     for(let i = 0; i < srcs.length; i++){
//       // sleep
//       await page.waitFor(200);
//       await srcToImg(srcs[i], mn);
//     }

//     await browser.close();

//   });
// })()
