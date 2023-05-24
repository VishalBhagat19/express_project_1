const express = require("express")

const app = express()

const port = 3100
const cloudinary = require('cloudinary')
const connectDB = require('./db/connectDB');
const bodyParser = require('body-parser');

// ================fileUploadlink================
const fileUpload = require("express-fileupload")
var session = require('express-session')
var flash = require('connect-flash');

const cookieParser = require('cookie-parser')
app.use(cookieParser())


//image
app.use(fileUpload({useTempFiles: true}));

// messages
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    
}));

//DB CONNECTION
connectDB();


app.use(flash());

//=================bodyparser setup=====================
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.urlencoded({extended:false}))

const router = require('./routes/web.js')

app.use('/',router)

app.set('view engine','ejs')
app.set("views")


//===================link public folder===============
app.use(express.static('public'))




app.listen(port,()=>{
    console.log(`server started on localhost:${port}`);
})