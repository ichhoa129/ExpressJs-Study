const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json');
const db =  low(adapter);

db.defaults({ users:[]})
  .write();

const port = 8000;
//set view
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//render index page
app.get('/',(req,res) => res.render('index'));
//get and show users
app.get('/users', (req,res) =>res.render('users/index',{
    db.get('users').value();
}));
//search user matched chars
app.get('/users/search',(req,res)=>{
    var q = req.query.q;
    var matchedUsers = users.filter(user => user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1 );
    res.render('users/index',{users: matchedUsers});
}); 
//create users
app.get('/users/create',(req,res)=>res.render('users/create'));
app.post('/users/create',(req,res)=>{
    db.get('users').push(req.body).write();
     res.redirect('/users');
});

app.listen(port,()=> console.log('Listening on port 8000'));