const {Schema, model, Types} = require('mongoose')
const games = 'games'
const gameschema = new Schema ({
    nametag1: {type: String, required: true},
    nametag2: {type: String, required: true},
    colpep: {type: Number, required: true},
    pay: {type: Number, required: true},
    prepay: {type: Number, required: true},
    tamada: {type: String, required: true},
    balman: {type: String, required: true},
    zvuk: {type: String, required: true},
    date: {type: String, required: true},
    admin: {type: String, required: true},
    week: {type: String, required: true},
    sale: {type: String, required: true},
    vyezd: {type: Number, required: true}
}) 

module.exports = model('Games', gameschema, games)