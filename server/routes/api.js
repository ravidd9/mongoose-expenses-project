const express = require('express')
const router = express.Router()
const request = require('request')
const moment = require('moment')

const Expense = require('../model/Expense')
const Data = require('../../expenses.json')
// console.log(Data)

router.get('/expenses', function (req, res) {
    Expense.find({}).sort({date: -1}).exec(function(err, expenses){
        res.send(expenses)
    })
})

function checkDate(date) {
    if (!date){
        return moment().format("LLLL")
    }
    else{
        return date.format("LLLL")
    }
}

router.post('/new', function (req, res) {
    let body = req.body
    let e1 = new Expense({
        item: body.item,
        amount: body.amount,
        group: body.group,
        // date: checkDate(body.date)
    })
    // e1.save()
    res.send(e1)
})







module.exports = router