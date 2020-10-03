import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState, useCallback } from 'react'
import moment from 'moment'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import 'moment/locale/ru'
import { layer } from '@fortawesome/fontawesome-svg-core'
import {useHttp} from '../../hooks/http.hook'

export const Gameinfpage = ({id,opengame}) => {
    const {loading,request} = useHttp()
    const addprepay = useCallback(async () => {
        try{
            const prepay = await document.getElementById('prepay').value
            if(prepay > gameinf.Summ){window.M.toast({html: 'Предоплата больше суммы игры'})}
            else{
            const inf = {
                prepay: prepay,
                message: id._id
            }
            const data = await request('/api/auth/addprepay', 'POST', inf)
            console.log(data)
            setGameinf({...gameinf, prepay: prepay})}
        }catch(e){
        }
    })
const [gameinf, setGameinf] = useState({
        date: id.date,
        timestart: id.timestart,
        timeend: id.timeend,
        zakazchik: id.name,
        zakazchikId: id.zakazchik,
        vyezd: id.vyezd,
        company: id.company,
        companyname: id.companyname,
        adres: id.adres,
        old: id.old,
        povod: id.povod,
        Summ: id.Summ,
        col: id.col,
        prepay: id.prepay,
        status: id.status,
        phone: id.phone,
        arenda: id.arenda
})
useEffect(()=>{
    if(gameinf.old == '1'){setGameinf({...gameinf,old: 'Дети: 6 - 12'})}
    if(gameinf.old == '2'){setGameinf({...gameinf,old: 'Дети: 13 - 15'})}
    if(gameinf.old == '3'){setGameinf({...gameinf,old: 'Дети: 15 - 17'})}
    if(gameinf.old == '4'){setGameinf({...gameinf,old: 'Взрослые: 18 - 26'})}
    if(gameinf.old == '5'){setGameinf({...gameinf,old: 'Взрослые: 27 - 35'})}
    if(gameinf.old == '6'){setGameinf({...gameinf,old: 'Взрослые: 36+'})}
    if(gameinf.povod == '1'){setGameinf({...gameinf,povod: 'Без повода'})}
    if(gameinf.povod == '2'){setGameinf({...gameinf,povod: 'Корпоратив'})}
    if(gameinf.povod == '3'){setGameinf({...gameinf,povod: 'Свадьба'})}
    if(gameinf.povod == '4'){setGameinf({...gameinf,povod: 'ДР'})}
    if(gameinf.povod == '5'){setGameinf({...gameinf,povod: 'Детский Утренник'})}
    if(gameinf.povod == '6'){setGameinf({...gameinf,povod: 'Мальчишник'})}
    if(gameinf.povod == '7'){setGameinf({...gameinf,povod: 'Девишник'})}
}, [gameinf])
    return(
        <div>
        {gameinf.vyezd == 0 ? 
        <div className="daytable homegame" id='datday'>
            <div className="NavDay">
                <p>{moment(gameinf.date,'D/M/Y').format('dd, D 	MMM YYYY г.')}</p>
            </div>
            <div className="container">
                <div className="row white-text">
                    <h2>{gameinf.timestart}>{gameinf.timeend}</h2>
                </div>
                <ul className='gameinformation'>
                    <li className='mainli'>Заказчик: {gameinf.zakazchik}</li>
                    {gameinf.company == 1 ? <li className='mainli'>Компания: {gameinf.companyname}</li> : ''}
                    <li className='mainli'>Количество: {gameinf.col}</li>
                    <li className='mainli'>Возраст: {gameinf.old}</li>
                    <li className='mainli'>Повод: {gameinf.povod}</li>
                    <li className='mainli'>Сумма: {gameinf.Summ}</li>
                    {gameinf.prepay != '' ? <li className='mainli'>Предоплата: {gameinf.prepay}</li>: <li><div className="input-field col s10 offset-s1">
                  <input type="text" name="prepay"  id='prepay'className='validate'></input>
                  <label htmlFor="prepay" >Предоплата</label>
                  <button onClick={addprepay} name={id._id} className="navigator-menu btn waves-effect waves-light addprepayhome" type="submit" name="action">Внести предоплату</button>
                </div></li>}
                </ul>
            </div>
        </div> : 
        <div className="daytable outgame" id='datday'>
            <div className="NavDay">
                <p>{moment(gameinf.date,'D/M/Y').format('dd, D 	MMM YYYY г.')}</p>
            </div>
            <div className="container">
                <div className="row white-text">
                    <h2>{gameinf.timestart}>{gameinf.timeend}</h2>
                </div>
                <ul className='gameinformation'>
                    <li className='mainli'>Адрес: {gameinf.adres}</li>
                    <li className='mainli'>Заказчик: {gameinf.zakazchik}</li>
                    {gameinf.company == 1 ? <li className='mainli'>Компания: {gameinf.companyname}</li> : ''}
                    <li className='mainli'>Количество: {gameinf.col}</li>
                    <li className='mainli'>Возраст: {gameinf.old}</li>
                    <li className='mainli'>Повод: {gameinf.povod}</li>
                    <li className='mainli'>Сумма: {gameinf.Summ}</li>
                    {gameinf.prepay != '' ? <li className='mainli'>Предоплата: {gameinf.prepay}</li>: <li><div className="input-field col s10 offset-s1">
                  <input type="text" name="prepay"  id='prepay'className='validate'></input>
                  <label htmlFor="prepay" >Предоплата</label>
                  <button onClick={addprepay} name={id._id} className="navigator-menu btn waves-effect waves-light addprepayvyezd" type="submit" name="action">Внести предоплату</button>
                </div></li>}
                </ul>
            </div>
        </div>
            }
            
        
        </div>
    )
}

export default Gameinfpage