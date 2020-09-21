import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import moment from 'moment'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import {Staticlist} from '../pages/Staticlist'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"




export const Statisticpage = () => {
    const [pararpam, setParam] = useState({
        userid: JSON.parse(localStorage.getItem('userData'))
    })
    const [ris, setRis] = useState()
    const [admin, setAdmin] = useState({
        perweek: 0,
        obshak: 0,
        pre: 0,
        preperweek: 0,
        colgame: 0
    })
    const [statika, setGamesa] = useState([])
    const {loading,request} = useHttp()
    const all = useCallback(async () => {
        try{
            
            const data = await request('/api/auth/static', 'POST', pararpam)
            setGamesa(data)
        }catch(e){
            console.log(statika)
        }
    }, [statika])
    useEffect(() => {
        all()
        getCastomstat()
    }, [all])

    const getCastomstat = () => {
        var income = 0
        var col = 0
        var pre = 0
        statika.map((game) => {
            if (moment(game.date, "HH:mm  M/D/Y").valueOf() > Date.parse(startDate) && moment(game.date, "HH:mm  M/D/Y").valueOf() < Date.parse(endDate)){
                income = income + game.pay
                col = col + 1
                pre = pre + game.prepay
            }
            setAdmin({...admin, colgame: col, obshak: income,preperweek: pre})

        }
        )
    }
    const getDatestat = () => {
            setRis(<Staticlist statika={statika} startDate={startDate} endDate={endDate}></Staticlist>)
    }
    const [startDate, setStartDate] = useState(() => {
        let d = new Date()
        let day = d.getDay()
        let diff = d.getDate() - day + (day == 0 ? -6:1)
        return(new Date(d.setDate(diff)))
    })
    const [endDate, setEndDate] = useState(new Date())
    return(
            <div className='container'>
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Игр проведено за период: {admin.colgame}</span>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Выручка за период: {admin.obshak}</span>
                    </div>
                  </div>
                </div>
                <div className="col s12 m6">
                    <div className="card blue darken-1">
                    <div className="card-content white-text">
                    <span className="card-title">Предоплаты за период: {admin.preperweek}</span>
                    </div>
                  </div>
                </div>
                <div className='container'>
                <div className='row'>
                <button onClick={getDatestat} className="navigator-menu blue btn waves-effect waves-light col s12" type="submit" name="action">
                Показать игры за период
                </button>
                </div>
                    <h4 className='col s12 white-text'>Выберите период</h4>
                    <DatePicker className="white-text date" selected={startDate} onChange={date => setStartDate(date)}></DatePicker>
                    <DatePicker className="white-text date" selected={endDate} onChange={date => setEndDate(date)}></DatePicker>
                </div>
                {ris}
            </div>
        )

}