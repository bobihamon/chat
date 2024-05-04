import http from 'http';
import path from 'path';
import fs from 'fs';
import { Server } from 'socket.io';
import  {getMessages, addMessage} from './database.js';
console.log(getMessages())

await addMessage("hello",1)
let m = await getMessages()
console.log(m)
const __dirname = path.resolve();

const pathToIndex = path.join(__dirname, 'static', 'index.html');
const indexHTMLFile = fs.readFileSync(pathToIndex);
const pathToStyle = path.join(__dirname, 'static', 'style.css');
const styleFile = fs.readFileSync(pathToStyle);
const pathToScript = path.join(__dirname, 'static', 'script.js');
const scriptFile = fs.readFileSync(pathToScript);
const pathToScriptIo = path.join(__dirname, 'static', 'socket.io.min.js');
const scriptFileIo = fs.readFileSync(pathToScriptIo);
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
        if (req.url == '/socket.io.min.js' && req.method === 'GET') {
            return res.end(scriptFileIo)
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
const io = new Server(server);
io.on('connection', (socket) => {
    console.log(`a user connected. id${socket.id}`)
    let username = ""
    socket.on("set_nickname", (data) => {
        username = data
    })
    socket.on('new_message', (data) => {
        io.emit("message", username + ": " + data) 
    })

})

