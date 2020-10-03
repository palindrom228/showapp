const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../modules/User')
const Games = require('../modules/Games')
const Clients = require('../modules/Clients')
const config = require('config')
const router = Router()
const moment = require('moment')
const { collection } = require('../modules/Games')


// /api/auth/register
router.post('/register',[
    check('email', 'Неправильная почта').isEmail(),
    check('password', 'Минимальная длина 6').isLength({min: 6})
], async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при регистрации'
            })
        }
        const {email, password} = req.body

        const candidate = await User.findOne({email})
        if  (candidate){
            return res.status(400).json({ message: 'Есть уже'})
        }
        const hasshedPassword = await bcrypt.hash(password, 12)
        const user= new User({email, password: hasshedPassword})

        await user.save()
        
        res.status(201).json({ message: 'Создали создали'}) 

    } catch(e){
        res.status(500).json({ message: 'Smth Happend'})
    }
})

// /api/auth/login
router.post('/login',[
    check('email', 'введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
], async (req, res) => {
    try{
        const errors = validationResult(req)

        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Неккоректные данные при Входе'
            })
        }
        
        const{email, password} = req.body

        const user = await User.findOne({ email })
        if (!user){
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(400).json ({ message: 'Неверный пароль'})
        }
        const token = jwt.sign(
            { userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '30m'}
        )
        res.json({ token, userId: user.id})
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})

// /api/auth/creategame
router.post('/creategame', async (req, res) => {
    try{
    
        
        const{date,timestart,timeend,name,vyezd,company,companyname,adres,old,povod,Summ,col,month,week,prepay,arenda,status,zakazchik} = req.body
        const game= new Games({date,timestart,timeend,name,vyezd,company,companyname,adres,old,povod,Summ,col,month,week,prepay,arenda,status,zakazchik})
        await collection.insertOne(game, function(err,docsInserted){
            res.status(200).json({message: docsInserted.ops[0]._id})
        });

    } catch(e){
        res.status(203).json({message: 'Что-то пошло не так'})
    }
})
// /api/auth/static
router.post('/static', async (req, res) => {
    try{
        const userid = req.body.userid
        
        const admin = await Games.find({admin: userid.userId})
        
            res.json(admin)
        
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})
// /api/auth/gamesmonth
router.post('/gamesmonth', async (req, res) => {
    try{
        const userid = req.body
        
        
        const admin = await Games.find({month: userid.month})
        
            res.json(admin)
       
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})
// /api/auth/thisgame
router.post('/thisgame', async (req, res) => {
    try{
        const gameid = req.body
        const admin = await Games.findOne({_id: gameid.message})
        
            res.json(admin)
       
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})
// /api/auth/addprepay
router.post('/addprepay', async (req, res) => {
    try{
        const id = req.body
        const admin = await Games.updateOne({_id: id.message}, {$set: {prepay: id.prepay}})
        
            res.json(admin)
       
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})
module.exports = router