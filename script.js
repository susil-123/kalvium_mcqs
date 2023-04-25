const http = require('http')
const url = require('url')
const fs = require('fs')
const sa = require('superagent')

const index = fs.readFileSync(`${__dirname}/index.html`,'utf-8')
const data = fs.readFileSync(`${__dirname}/data/data.json`,'utf-8')
const card = fs.readFileSync(`${__dirname}/card.html`,'utf-8')
const dataObj = JSON.parse(data)


const replaceTemp =(ele,card)=>{
    let output =card.replace(/{%QUESTION%}/g,ele.question)
    output = output.replace(/{%OPTION1%}/g,ele.option1)
    output = output.replace(/{%OPTION2%}/g,ele.option2)
    output = output.replace(/{%OPTION3%}/g,ele.option3)
    output = output.replace(/{%OPTION4%}/g,ele.option4)
    output = output.replace(/{%ANS%}/g,ele.ans)
    output = output.replace(/{%ID%}/g,ele.id)

    return output;
}

const server = http.createServer((req,res)=>{
    const{query,pathname}=url.parse(req.url,true)
//    const pathname = req.url
    if(pathname === '/' || pathname === '/home')
    {
        const out = dataObj.map(e=>replaceTemp(e,card)).join("")
        const output = index.replace(/{%CARD%}/g,out)
        res.end(output)
    }
    else {
        res.end("page not found")
    }
})
server.listen(8000,'192.168.40.104',()=>{
    console.log("server started")
})