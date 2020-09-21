import React, {useState, useCallback, useEffect, useContext} from 'react'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import moment from 'moment'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'



export const EventCalendar = () => {

    return(
        <div className='table'>
            <div className='moth-line'>
                <div className='day'></div>
                <div className='day'></div>
                <div className='day'></div>
                <div className='day'></div>
                <div className='day'></div>
                <div className='day'></div>
                <div className='day'></div>
            </div>
        </div>
    )
}

export default EventCalendar