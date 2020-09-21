const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const Games = require('../modules/Games')
const config = require('config')
const router = Router()


// /api/auth/creategame
router.post('/creategame', async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при Входе'
            })
        }
        
        const{nametag1, nametag2,colpep,pay,prepay} = req.body
        const game= new Games({nametag1, nametag2,colpep,pay,prepay})
        console.log(req.body)

        await game.save()
        res.status(201).json({ message: 'Создали создали'}) 
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})

module.exports = router