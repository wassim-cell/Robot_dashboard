const express = require("express")

const app = express()
const path = require("path")
const exhbs = require("express-handlebars")
const dashRouter = require("./rootes/dashboard.route")
const adminRouter = require("./rootes/admin.roote")
const session = require('express-session')
const mongoStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')



var store = new mongoStore ({
    uri : "mongodb://localhost:27017/blog3" ,
    collection : "sessions"
})
app.use(session({
    secret : 'fdddfsds sdsf' ,
    store : store ,
    resave : true ,
    saveUninitialized : true
}))



app.use(express.static(path.join(__dirname,'assets')))

app.engine('handlebars', exhbs.engine({extname: 'exhbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));

app.set('view engine','ejs')

app.set('views','views')

app.use(flash())
app.use('/',dashRouter)
app.use('/',adminRouter)


app.get('/mail',(req,res,next)=>{
    res.render('mail')
})

app.get('/',(req,res,next)=>{
    res.render('homePage')
})







app.get('*',(req,res,next)=>{
    res.redirect('/pageNotFound')
})



app.listen(4500,()=>console.log("server run on 4500"))