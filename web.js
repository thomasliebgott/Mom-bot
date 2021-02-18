const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 3000
const users = require('./users.json')
const mysql = require('mysql');


app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  
//1. Hello world API des users
 app.get('/users', (req,res) => {
     res.send("Liste des users")
 })

//2. API static
// app.get('/users', (req,res) => {
    // res.status(200).json(users)
// })

