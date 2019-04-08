const mongoose = require('mongoose')
const Data = require('../../expenses.json')

const Schema = mongoose.Schema

const expenseSchema = new Schema({
    amount: Number,
    group: String,
    date: Date,
    item: String
})
const Expense = mongoose.model("Expense", expenseSchema, "expenses")


// for(let d of Data){
//     let e1 = new Expense({
//         amount: d.amount,
//         group: d.group,
//         date: d.date,
//         item: d.item
//     })
//     e1.save()
// }

module.exports = Expense