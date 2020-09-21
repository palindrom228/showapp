import React from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import { Gamepage } from './Gamepage'
import { Statisticpage } from './Statisticpage'
import {Authpage} from './Authpage'
import {Creategame} from './Creategame'

export const Menupage = () => {

    return(
        <div className='container'>
        <div className="row">
            <NavLink to="/create"><button className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">
            Создать игру
            </button></NavLink>
            <NavLink to="/static">
            <button className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">
            Статистика
            </button>
            </NavLink>
            <NavLink to="/calendar">
            <button className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">
            Календарь
            </button>
            </NavLink>
            <NavLink to="/zp">
            <button className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">
            Зарплата
            </button>
            </NavLink>
            </div>
            </div>
    )
}
