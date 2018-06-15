/**
 * Created by madujith on 5/26/18.
 */
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT||3002;
const app = express();

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var log = `${req.method} :- ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n',(err)=>{
        if (err){
            console.log('Unable to attend log to file');
        }
    });
    next();
});

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        'title':'Home Page'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        'title':'About Page'
    });
});

app.listen(port,()=>{
    console.log(`server lisrning on port ${port}`);
});