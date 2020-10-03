const {Schema, model, Types} = require('mongoose')
const games = 'games'
const gameschema = new Schema ({
    date: {type: String, required: true},
    timestart: {type: String, required: true},
    timeend: {type: String, required: true},
    name: {type: String, required: true},
    zakazchik: {type: String, required: true},
    vyezd: {type: Number, required: true},
    company: {type: Number, required: true},
    companyname: {type: String, required: true},
    adres: {type: String, required: true},
    old: {type: String, required: true},
    povod: {type: String, required: true},
    Summ: {type: String, required: true},
    week: {type: String, required: true},
    month: {type: String, required: true},
    col: {type: String, required: true},
    prepay: {type: String, required: true},
    status: {type: Number, required: true},
    arenda: {type: Number, required: true}
}) 

module.exports = model('Games', gameschema, games)