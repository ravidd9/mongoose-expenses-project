const express = require('express')
const router = express.Router()
const request = require('request')
const moment = require('moment')

const Expense = require('../model/Expense')
const Data = require('../../expenses.json')
// console.log(Data)

//getting expenses
router.get('/expenses', function (req, res) {
    Expense.find({}).sort({date: -1}).exec(function(err, expenses){
        res.send(expenses)
    })
})

//add new expenses
router.post('/new', function (req, res) {
    let body = req.body
    let e1 = new Expense({
        item: body.item,
        amount: body.amount,
        group: body.group,
        date: checkDate(body.date)
    })
    e1.save().then(function(err, result){
        console.log("The expense cost: " + e1.amount + ", for buying: " + e1.item)
    })
    res.send(e1)
})
function checkDate(date) {
    if (!date){
        return moment().format("LLLL")
    }
    else{
        return moment(date).format("LLLL")
    }
}

//update expenses
router.put('/update/:group1/:group2', function(req, res){
    let group1= req.params.group1
    let group2= req.params.group2
    Expense.findOneAndUpdate({group: group1}, {group: group2}, {new: true}, function(err,expense){
        res.send(expense)
    })
})

//get expenses by group
// router.get('/expenses/:group1', function (req, res) {
//     let group1 = req.params.group1
//     Expense.find({group: group1}, function(err, expenses){
//         res.send(expenses)
//     })
// })

//get total expenses by group --- not working
// router.get('/expenses/:group1/:total', function (req, res) {
//     let group1 = req.params.group1
//     if(req.params.total == true){
//         Expense.find({group: group1}, function(err, expenses){
//             res.send(expenses)
//         })
//     }
//     else{
//         Expense.aggregate([
//             {$match:{group: group1}},
//             {$group:{count: {$sum: 1}}}
//         ], function(err,expenses){
//                 res.send(expenses)
//             }
//         )
//     }
// })

//get all expenses for date range
router.get('/expenses/:d1/:d2', function (req, res) {
    let d1 = req.params.d1
    let d2 = req.params.d2
    if(!d1){
        res.redirect('/expenses')
    }
    else if(!d2){
        d2= moment().format('LLLL')
    }
    Expense.find({$and:[
        {date: {$gt:d1}},
        {date: {$lt:d2}}
    ]},function(err, expenses){
        res.send(expenses)
    })
})






module.exports = router