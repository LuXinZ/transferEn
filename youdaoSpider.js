const puppeteer = require('puppeteer');
let page
let browser
const initYouDao = async () => {
    browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
        defaultViewport:{
            width:4396,
            height:3000
        }
    });
    page = await browser.newPage();
}
const initTranslateYouDao = async (translateText) => {

    return new Promise(async (resolve, reject) => {

        page.on('response', async res => {
            let url = res.url()
            if (url.includes('translate_o')){
                let tRes = await res.json()
                let tText = ''
                tRes.translateResult.forEach((item) => {
                    item.forEach((it) => {
                        tText += it.tgt
                    })
                })
                resolve(tText)
            }
        });
        await getPage(translateText,page)
    })


};
let getPage = async (text,page) => {
    await page.goto('https://fanyi.youdao.com/');
    await page.click("#inputOriginal")
    await page.type("#inputOriginal", text);
    await page.click("#transMachine")
}
// 输入框 id inputOriginal
// 翻译按钮 class fanyi__operations--machine
module.exports = {initTranslateYouDao,initYouDao}