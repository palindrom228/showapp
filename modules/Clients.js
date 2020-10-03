const {Schema, model, Types} = require('mongoose')
const clients = 'clients'
const schema = new Schema ({
    phone: {type: String, required: true},
    name: {type: String, required: true},
    companyname: {type: String, required: true}
}) 

module.exports = model('Clients', schema,clients)