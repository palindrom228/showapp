import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import moment from 'moment'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import Calendaritem from './Calendaritem'
import Daypage from './Daypage'
import Writegame from './Writegame'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import 'moment/locale/ru'
import { Gameinfpage } from './Component/Gameinfpage'




export const EventCalendar = () => {
    const [currDate, setCurr] = useState(new Date())
    const [Monththis, setMonththis] = useState(moment(currDate).format('M/Y'))
    moment.locale('ru')
    const table = [
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','',''],
        ['','','','','','','']
    ]
    const [pararpam, setParam] = useState({
        userid: JSON.parse(localStorage.getItem('userData')),
        month: Monththis
    })
    const [zpstat, setZp] = useState([])
    const {loading,request} = useHttp()
    const all = useCallback(async () => {
        try{
            
            const data = await request('/api/auth/gamesmonth', 'POST', pararpam)
            setZp(data)
            console.log(data)
        }catch(e){
            console.log(zpstat)
        }
    })
    
    useEffect(() =>{
        showmonth()
        all()
    }, [Monththis])
    useEffect(() =>{
        showmonth()
    }, [zpstat])
    const showmonth = () => {
        var startDate = moment(Monththis,"M/Y").valueOf() - (moment(moment(Monththis, "M/Y").valueOf()).isoWeekday() - 1) * 86400000
        var rowscol = ((moment(moment(Monththis,"M/Y").add(1, 'months')).valueOf() - startDate) / 86400000) / 7
        var day = startDate
          for(let i in table){
              for(let y in table[i]){
                  table[i][y] = day
                  day = day + 86400000
              }
          }
           setItems(<Calendaritem currDate={currDate} table={table} rowscol={rowscol} zpstat={zpstat} select={select}></Calendaritem>)
    }
    const create = async(wtiteinf) => {
        try{
              const inf = {name: wtiteinf.name, companyname: wtiteinf.companyname, phone: wtiteinf.phone}
              const client = await request('/api/client/addclient', 'POST', {...inf})
              console.log('Data',client)
              wtiteinf.zakazchik = client.message
              console.log(inf.zakazchik )
              const data = await request('/api/auth/creategame', 'POST', {...wtiteinf})
              console.log('Data',data)
              const gameid = await request('/api/auth/thisgame', 'POST', {...data})
              console.log('Data',gameid)
              zpstat.push(gameid)
              showmonth()
              if(gameid){
                setDatpage(<Gameinfpage id={gameid}></Gameinfpage>)
              }
          }catch(e){}
    }
    const shownextmonth = () => {
        setMonththis(moment(Monththis, 'M/Y').add(1, 'months').format('M/Y'))
        setParam({...pararpam, month: moment(Monththis, 'M/Y').add(1, 'months').format('M/Y')})
    }
    const showprevmonth = () => {
        setMonththis(moment(Monththis, 'M/Y').subtract(1, 'months').format('M/Y'))
        setParam({...pararpam, month: moment(Monththis, 'M/Y').subtract(1, 'months').format('M/Y')})
    }
    const thisday = () => {
        setMonththis(moment(currDate).format('M/Y'))
    }
    const opengame = async (event) => {
        var data = {
            message: event.currentTarget.getAttribute('name')
        }
        const gameid = await request('/api/auth/thisgame', 'POST', {...data})
        console.log('Data',gameid)
        setDatpage(<Gameinfpage id={gameid} opengame={opengame}></Gameinfpage>)
    }
    const createnewgame = event => {
        console.log(event.currentTarget.getAttribute('name'))
        setDatpage(<Writegame dd={event.currentTarget.getAttribute('name')} create={create}></Writegame>)
    }
    var flag = 0
    const select = event => {
        var click = [...document.getElementsByClassName('clicked')]
        click.map((tds) =>{
            if(event.currentTarget!=tds)tds.classList.remove('clicked')
        })
        if(event.currentTarget.classList.contains('clicked')){
            var table = [...document.getElementsByClassName('table')]
            table.map((tab)=>{
                tab.classList.add('backform')
            })
            setFlag(1)
            setDatpage(<Daypage choosenday={event.currentTarget.getAttribute('name')} currDate={currDate} zpstat={zpstat} createnewgame={createnewgame} opengame={opengame}></Daypage>)
        }else{
        event.currentTarget.classList.add('clicked')
    }
    }
    const [flagforback,setFlag] = useState(0)
    const back = () => {
        var tab = [...document.getElementsByClassName('table')]
            tab.map((caltab)=>{
                if(caltab.classList.contains('backform') && flagforback == 1){
                    var daytab = document.getElementById('datday')
                        daytab.classList.add('enddayform')
                        caltab.classList.add('forwardtab')
                        setFlag(0)
                        setTimeout(()=>{
                            setDatpage()
                            caltab.classList.remove('forwardtab')
                            caltab.classList.remove('backform')
                        },500)
                }
            })
    }
    const [items, setItems] = useState()
    const [datpage, setDatpage] = useState()
    return(
        
        <div>
            
            {datpage}
        <div className='table' onClick={back}>
            
            <div className="Navbarcal">
                <p className="thisday" onClick={thisday}>Сегодня</p>
                <p className="thismonth">{moment(Monththis, "M/Y").format('MMMM YYYY г')}</p>
                <div className="navblok">
                <a onClick={showprevmonth}><FontAwesomeIcon icon={faArrowLeft}/></a>
                <a onClick={shownextmonth}><FontAwesomeIcon icon={faArrowRight}/></a>
                </div>
            </div>
            <table className="centered" >
                <thead>
                    <tr>
                        <th>пн</th>
                        <th>вт</th>
                        <th>ср</th>
                        <th>чт</th>
                        <th>пт</th>
                        <th>сб</th>
                        <th>вс</th>
                    </tr>
                </thead> 
                {items}
            </table>
        </div>
        </div>
    )
}

export default EventCalendar