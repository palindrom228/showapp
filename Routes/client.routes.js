const {Router} = require('express')
const {check, validationResult} = require('express-validator')
const Clients = require('../modules/Clients')
const config = require('config')
const router = Router()
const moment = require('moment')
const { collection } = require('../modules/Clients')


router.post('/addclient', async (req, res) => {
    try{
        const{phone,name,companyname} = req.body
        const game= new Clients({phone,name,companyname})
        await collection.insertOne(game, function(err,docsInserted){
            res.status(200).json({message: docsInserted.ops[0]._id})
        });

    } catch(e){
        res.status(203).json({message: 'Что-то пошло не так'})
    }
})
module.exports = router