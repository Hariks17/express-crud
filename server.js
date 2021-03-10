const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars')
const app=express()
const PORT = process.env.PORT || 5000;
const members= require('./Members')
//Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


//Body Parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>res.render('index',{
    title:"My Member App",
    members
}));

app.use('/api/members',require('./routes/api/members'))

//app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,()=>{console.log(`Server started at Port ${PORT}`)})
//res.sendFile(path.join(__dirname,'public','index.html'))