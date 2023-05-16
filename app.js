const express=require('express')
const bodyParser=require('body-parser')
const path=require('path')
const fs=require('fs')
const app=express()

app.use(bodyParser.urlencoded({extended:false}))

app.get('/login', (req,res,next)=>{
    res.sendFile(path.join(__dirname, 'login.html'))
})

app.post('/mid', (req,res,next)=>{
    fs.appendFileSync('chats.txt', ` ${req.body.username}: ${req.body.message}; `);
    res.redirect('/')
})

app.get('/', (req,res,next)=>{
    let text = fs.readFileSync("chats.txt").toString("utf8");
    if(text==""){
        text='No chat exists'
    }
    res.send(`<form action="/mid" method="POST" onsubmit="document.getElementById('username').value=localStorage.getItem('username')">
    <p>${text}</p>
    <input type= "text" placeholder="message" name="message" id="message">
    <input type="hidden" name="username" id="username"><br>
    <button id="submit">SEND</button>
    </form>`)
})

app.use((req,res,next)=>{
    res.status(404).send('<h1>PAGE NOT FOUND</h1>')
})
const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});