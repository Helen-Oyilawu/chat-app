const express = require('express')
const {v4: uuidv4} = require('uuid')

const app = express()

require('dotenv').config()


const port = process.env.PORT || 3000

const http = require('http').createServer(app)

const io = require('socket.io')(http)


app.set('view engine', 'ejs')

app.use(express.static('public'))

app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.get('/chat/:chatId', (req, res)=>{

    const {chatId} = req.params

    if (!chatId || chatId.trim() == "") {
        res.redirect('/join?error=please+enter+a+chat')
    }

    res.render('index', {
        title : 'Dike',
        Description: 'szhxc,v.bl;',
        chatId
    })
})

app.get('/', (_, res)=>res.redirect('/join'))

app.get('/join', (req, res)=>{
    res.render('join')
} )

app.get('/create', (req, res)=>{
    res.render('create')
} )

app.post('/create/new/chat', (req, res)=>{
    const {chat_name} = req.body;
    if (!chat_name || chat_name.trim() == '') {
        return res.redirect('/create?error=please+Enter+a+Name')
    }


    const chatId = uuidv4();

    res.redirect(`/chat/${chatId}`)


})





app.listen(port, ()=>{
    console.log(`server is runing on port: ${port}`);



    
})