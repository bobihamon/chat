import http from 'http';
import path from 'path';
import fs from 'fs';

const __dirname = path.resolve();

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHTMLFile = fs.readFileSync(pathToIndex);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleFile = fs.readFileSync(pathToStyle);
const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptFile = fs.readFileSync(pathToScript);
const server = http.createServer((req, res) => {
    try {
        if (req.url == '/' && req.method === 'GET') {
            return res.end(indexHTMLFile)
        }
        if (req.url == '/script.js' && req.method === 'GET') {
            return res.end(scriptFile)
        }
        if (req.url == '/style.css' && req.method === 'GET') {
            return res.end(styleFile)
        }
        res.writeHead(404, "Not Found")
        return res.end()
    } catch (error) {
        console.error(error.message)
        res.writeHead(500, "Server Error")
        res.end()
    }
})

server.listen(3000, function () {
    console.log('server is running on port 3000')
})