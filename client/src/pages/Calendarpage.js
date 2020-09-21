import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import moment from 'moment'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'
import EventCalendar from '../pages/EventCalendar'


export const Calendarpage = () => {

    return(
        <EventCalendar></EventCalendar>
    )
}
