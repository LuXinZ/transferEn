const express = require('express')
const {initTranslate,init} = require('./spider')
const {initTranslateYouDao,initYouDao} = require('./youdaoSpider')
const app = express()
const port = 3680

app.get('/index', async (req, res) => {
    let finishText= ''
    if (req.query.type === 'youdao'){
        finishText=  await initTranslateYouDao(req.query.text)
    }
    if (req.query.type ==='baidu'){
        finishText=   await initTranslate(req.query.text)
    }
    res.send(finishText)

})

app.listen(port, async () => {
    //await init()
    await initYouDao()
    console.log(`listening at http://localhost:${port}`)
})
process.on('uncaughtException', function (err) {
    //打印出错误
    console.log(err);
    //打印出错误的调用栈方便调试
    console.log(err.stack)
});