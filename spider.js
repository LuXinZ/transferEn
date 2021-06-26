const puppeteer = require('puppeteer');
let page
let browser
const init = async () => {

    browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    });

    console.log(await browser.wsEndpoint())
    page = await browser.newPage();


}
const initTranslate = async (translateText) => {


    return new Promise(async (resolve,reject) => {

        page.on('response', async res => {
            console.log(await res)
            let data = await res.url()

            if (data.includes('v2transapi')){

                let body = await res.json()

                if (body.trans_result.data?.length > 0){

                    resolve(body.trans_result.data[0].dst)
                }

            }

        });
        await getPage(translateText,page)
        browser.close()
    })
};
let getPage = async (text,page) => {
    await page.goto('https://fanyi.baidu.com/#en/zh/'+ text );
}
module.exports = {initTranslate,init}