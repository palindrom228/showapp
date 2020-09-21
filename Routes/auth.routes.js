const {Router} = require('express')
const bcrypt = require('bcrypt')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('../modules/User')
const Games = require('../modules/Games')
const config = require('config')
const router = Router()

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
    
        
        const{nametag1,nametag2,colpep,pay,prepay,tamada,balman,zvuk,date,week,vyezd,sale} = req.body
        const admin = '5f57577202b2c1087cc70581'
        
        if(nametag1=='' || nametag2==''){
            res.status(405).json({message: 'заполните названия команд'})
        }
        if(balman=='' || zvuk=='' || tamada==''){
            res.status(405).json({message: 'Заполните поля работников'})
        }
        if(colpep==0 || pay==0){
            res.status(405).json({message: 'Заполните данные по игре'})
        }

        const game= new Games({nametag1, nametag2,colpep,pay,prepay,tamada,balman,zvuk, admin,date,week,vyezd,sale})
        
        await game.save()
        res.status(200).json({message: 'Снова третье сеньтебря'})
    } catch(e){
        
        res.status(203).json({message: 'SMTH HAPPEND'})
    }
})

// /api/auth/static
router.post('/static', async (req, res) => {
    try{
        const userid = req.body.userid

        const bally = await Games.find({balman: userid.userId})
        const zvuk = await Games.find({zvuk: userid.userId})
        const tamada = await Games.find({tamada: userid.userId})
        const admin = await Games.find({admin: userid.userId})
        if (admin.length != 0) {
            res.json(admin)
        }else{
            res.json({bally,tamada,zvuk})
        }
    } catch(e){
        
        res.status(501).json({ message: 'Smth Happend'})
    }
})
module.exports = router