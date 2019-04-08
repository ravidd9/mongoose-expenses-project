
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const path = require('path')
const request = require('request')
const mongoose = require('mongoose')
const Expense = require("./server/model/Expense")
const api = require('./server/routes/api')


mongoose.connect("mongodb://localhost/mongoose-expenses", { useNewUrlParser: true })


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', api)






app.listen(3000, function() {
    console.log("Server up and running on port 3000")
  })