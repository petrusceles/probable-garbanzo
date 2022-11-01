const http = require('http');
const path = require("path");
const fs = require("fs");
const BASE_DIRECTORY = path.join(__dirname, '..')
const PUBLIC_DIRECTORY = path.join(BASE_DIRECTORY,'/public')
const IMAGE_FORMATS = ['jpeg','jpg', 'svg','png']
const MIME_TYPE = {
    "jpg":"image/jpeg",
    "jpeg":"image/jpeg",
    "svg":"image/svg+xml",
    "png":"image/png",
    "css":"text/css",
    "js":"text/js"
}

const serveStaticFile = (res,path,contentType,responseCode) => {
    if(!responseCode) responseCode = 200;

    console.log(BASE_DIRECTORY + path)

    fs.readFile(BASE_DIRECTORY + path, (err,data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type' : 'text/plain' });
            res.end('500 - Internal Error');
        } else {
            res.writeHead( responseCode, { 'Content-Type' : contentType });
            res.end(data);
        }
    })
}

const getHTML = (fileName) => {
    const htmlFileIndex = path.join(PUBLIC_DIRECTORY, fileName);
    const htmlIndex = fs.readFileSync(htmlFileIndex, 'utf8');
  
    return htmlIndex
  }

const servePublic = (res, url,urlArray) => {
    const mimeType = MIME_TYPE[urlArray.at(-1)]
    serveStaticFile(res,url,mimeType)
}

const serverHandle = (req,res) => {
    const url = req.url;
    const urlArray = url.split(/[/.]+/)
    if (urlArray.includes('public')) {
        servePublic(res,url,urlArray)
    } else {
        switch(url) {
            case "/":
                const htmlIndex = getHTML('index.html')
                res.writeHead(200, { 'Content-Type' : 'text/html' })
                res.end(htmlIndex)
                return
        }
    }
}

const server = http.createServer(serverHandle)

server.listen(2000, '127.0.0.1', () => {
  console.log("Server sudah berjalan, silakan buka http://localhost:2000");
})