const express = require('express');
var bodyParser = require('body-parser')
const flash = require('connect-flash');
const session = require('express-session');
const app = express();
app.set("view engine","ejs")
app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }))
var contacts=[{
    "FirstName":"Praneeth",
    "LastName":"Pularasetti",
    "PhoneNumber":"656565454"
},{
    "FirstName":"Sudheer",
    "LastName":"Vikram",
    "PhoneNumber":"88888888"
},{
    "FirstName":"Srinivas",
    "LastName":"Veeravalli",
    "PhoneNumber":"9999999999"
}];
app.use(session({
    secret: 'codeforgeek',
    saveUninitialized: true,
    resave: true
}));

app.get('/',function(req,res){
    res.render('index',{"Numbers": contacts, "msg":req.flash('message')})
})
app.post('/add',function(req,res){
    var a={
        "FirstName":req.body.FirstName,
        "LastName":req.body.LastName,
        "PhoneNumber":req.body.PhoneNumber
    }
    contacts.push(a)
    req.flash('message',"Add Successfully")
    res.redirect('back');
})
app.get('/delete/:id',function(req,res){
    const id=req.params.id
    contacts.splice(id,1);
    req.flash('message',"Delete Successfully")
    res.redirect('back')
})
app.get('/update/:id',function(req,res){
    const idforu=req.params.id
    res.render('update',{ "id":idforu, "contacts":contacts[idforu] })
})
app.post('/update/:id',function(req,res){
    const idforu=req.params.id
    contacts[idforu].FirstName = req.body.FirstName
    contacts[idforu].LastName = req.body.LastName
    contacts[idforu].PhoneNumber = req.body.PhoneNumber
    req.flash('message',"Update Successfully")
    res.redirect('/')
})


app.listen(7000);