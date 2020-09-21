import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import moment from 'moment'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import EventCalendar from '../pages/EventCalendar'
import Zpstat from '../pages/Zpstat'


export const Zp = () => {
    const [pararpam, setParam] = useState({
        userid: JSON.parse(localStorage.getItem('userData'))
    })
    const [zpstat, setZp] = useState([])
    const {loading,request} = useHttp()
    const all = useCallback(async () => {
        try{
            
            const data = await request('/api/auth/static', 'POST', pararpam)
            setZp(data)
        }catch(e){
            console.log(zpstat)
        }
    }, [zpstat])
    useEffect(() => {
        all()
    }, [all])
    return(
        <div className='container'>
        <table className='zptable white-text'>
        <thead>
          <tr>
              <th>Имя</th>
              <th>Баллы</th>
              <th>Ведуший</th>
              <th>Звук</th>
              <th>Кол игр</th>
              <th>ЗП</th>
          </tr>
        </thead>
        <Zpstat zpstat={zpstat}></Zpstat>
        </table>
        </div>
    )
}
