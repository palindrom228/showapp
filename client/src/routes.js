import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {Menupage} from './pages/Menupage'
import { Gamepage } from './pages/Gamepage'
import { Statisticpage } from './pages/Statisticpage'
import {Authpage} from './pages/Authpage'
import {Creategame} from './pages/Creategame'
import {Calendarpage} from './pages/Calendarpage'
import {Zp} from './pages/Zp'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path="/Menupage" exact>
                    <Menupage />
                </Route>
                <Route path="/create" exact>
                    <Creategame />
                </Route>
                <Route path="/game" exact>
                    <Gamepage />
                </Route>
                <Route path="/static" exact>
                    <Statisticpage />
                </Route>
                <Route path="/calendar" exact>
                    <Calendarpage />
                </Route>
                <Route path="/zp" exact>
                    <Zp />
                </Route>
                <Redirect to="/Menupage"></Redirect>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/" exact>
                <Authpage></Authpage>
            </Route>
            <Redirect to="/"></Redirect>
        </Switch>
    )
}