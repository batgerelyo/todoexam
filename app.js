const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const { request } = require('express');

const app = express();
const PORT = process.env.Port || 3000;

app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017//requestDB',{useNewUrlParser:true, useUnifiedTopology: true});

const requestSchema = mongoose.Schema({
    item: String
})


const RequestModel = mongoose.model('Request', requestSchema)


app.get('/', function(req,res){
    RequestModel.find(function(err,found){
        if(err){
            console.log(err)
        } else {
            res.render('home',{items: found})
        }
    })
})

app.post('/', function(req,res){
    const input = req.body.input

    const newList = new RequestModel({
        item: input
    })
    newList.save(function(err){
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
})

app.post('/delete',function(req,res){
    const item =req.body.input

    request.findByIdAndRemove(item, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect('/')
        }
    })
})




app.listen(PORT, function(){
    console.log('listening on http:/localhost' +PORT)
});