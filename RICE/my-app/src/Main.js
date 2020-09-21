import React, { useState} from 'react'
import ReactDOM from 'react-dom'
import Stage1 from './Stage1'
import { register } from './serviceWorker';
const mongoose = require('mongoose')
const Uri = 'mongodb+srv://Tamir:reebo102@cluster0.gzohh.azure.mongodb.net/<dbname>?retryWrites=true&w=majority'


  mongoose.connect(Uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })


function Main() {

  return (
    
    <div className='Register'>
    <input type='text' id='tag1' placeholder='Название команды 1'></input>
    <input type='text' id='tag2' placeholder='Название команды 2'></input>
    <input type='text' placeholder='Количество играющих'></input>
    <input type='number' placeholder='Сумма оплаты'></input>
    <input type='number' placeholder='Предоплата'></input>
    <select name='Action'>
        <option value=''>Ведуший</option>
        <option value='tumen'>Тумэн</option>
        <option value='nikita'>Никита</option>
    </select>
    <select name='Action'>
        <option value=''>Бальник</option>
        <option value='tumen'>Тумэн</option>
        <option value='nikita'>Никита</option>
        <option value='zhigrider'>Александр</option>
        <option value='dandar'>Дандар</option>
        <option value='geser'>Гэсэр</option>
    </select>
    <select name='Action'>
        <option value=''>Звукорежисер</option>
        <option value='zhigrider'>Александр</option>
        <option value='geser'>Гэсэр</option>
    </select>
    
    <input type='submit' className='button' value='Начать игру' onClick=''></input>
    </div>
    
  )
}


export default Main;
