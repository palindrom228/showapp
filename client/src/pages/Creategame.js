import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink,useHistory} from 'react-router-dom'
import { Gamepage } from './Gamepage'
import { Statisticpage } from './Statisticpage'
import {Authpage} from './Authpage'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'


export const Creategame = () => {

    const history = useHistory()
    const {createName1,nameteam,rabs,vyezdy} = useContext(AuthContext)
    const {loading,request, error, clearError} = useHttp()
    const message = useMessage()
    const create = async () => {
        try{
          console.log(nameteam)
            const data = await request('/api/auth/creategame', 'POST', {...nameteam})
            history.push('/game')
        }catch(e){}
    }
    useEffect(() => {
      console.log('Error', error)
      message(error)
      clearError()
  }, [error, clearError])
    return(
      <div className='container'>
        <div className='row'>
            <div>
            <select className="browser-default" name="tamada" value={nameteam.tamada} onChange={createName1}>
      <option value="22" type='text' disabled >Выберите Ведушего</option>
      <option value={rabs[2]} type='text'>Тумэн</option>
      <option value={rabs[1]} type='text'>Никита</option>
      <option value={rabs[6]} type='text'>Солбон</option>
    </select>
    <select className="browser-default" name="balman" value={nameteam.balman} onChange={createName1}>
      <option value="22" type='text' disabled >Выберите Бальника</option>
      <option value={rabs[1]} type='text'>Никита</option>
      <option value={rabs[2]} type='text'>Тумэн</option>
      <option value={rabs[4]} type='text'>Александр</option>
      <option value={rabs[3]} type='text'>Гэсэр</option>
      <option value={rabs[5]} type='text'>Дандар</option>
      <option value={rabs[7]} type='text'>Евгений</option>
    </select>
    <select className="browser-default" name="zvuk" value={nameteam.zvuk} onChange={createName1}>
      <option value="22" type='text' disabled >Выберите Звукача</option>
      <option value={rabs[4]} type='text' >Александр</option>
      <option value={rabs[3]} type='text' >Гэсэр</option>
    </select>
  <div className="input-field col s12">
    <input id="nametag" onChange={createName1} name='nametag1' type="text" className="validate" />
    <label htmlFor="nametag">Название команды 1</label>
  </div>
  <div className="input-field col s12">
    <input id="nametag2" onChange={createName1} name='nametag2' type="text" className="validate" />
    <label htmlFor="nametag2">Название команды 2</label>
  </div>
  <div className="input-field col s12">
    <input id="colpep" onChange={createName1} name='colpep' type="number" className="validate" />
    <label htmlFor="colpep">Количество играющих</label>
  </div>
  <div className="input-field col s12">
    <input id="summa" onChange={createName1} name='pay' type="number" className="validate" />
    <label htmlFor="summa">Сумма к оплате</label>
  </div>
  <div className="input-field col s12">
    <input id="prepay" onChange={createName1} name='prepay' type="number" className="validate" />
    <label htmlFor="prepay">Предоплата</label>
  </div>
  <div className="input-field col s12">
    <input id="sale" onChange={createName1} name='sale' type="number" className="validate" />
    <label htmlFor="sale">Сертефикат</label>
  </div>
  <div className="input-field col s12">
    <input id="col" onChange={createName1} name='col' type="number" className="validate" />
    <label htmlFor="col">Количество конкурсов</label>
  </div>
  <p>
      <label>
        <input type="checkbox" onChange={vyezdy}/>
        <span>Выездное мероприятие</span>
      </label>
    </p>
  
    

  


</div>
<button onClick={create} className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">
            Создать игру
            </button>


        </div>
        </div>
    )
}