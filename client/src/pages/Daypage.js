import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import 'moment/locale/ru'
import { layer } from '@fortawesome/fontawesome-svg-core'


export const Daypage = ({currDate,choosenday,zpstat,createnewgame,opengame}) => {

    return(
        <div>
        <div className="daytable" id='datday'>
            <div className="NavDay">
                <p>{moment(Number(choosenday)).format('dd, D 	MMM YYYY г.')}</p>
                <a onClick={createnewgame} name={choosenday}><FontAwesomeIcon icon={faPlus}/></a>
            </div>
            <div className="container gameblock">
                {

                    zpstat.map((game)=>{
                        if(moment(game.date,'D/M/Y').format('D/M/Y') == moment(Number(choosenday)).format('D/M/Y'))
                            return(
                                <div className='row gamemin' onClick={opengame} name={game._id}>
                                    <div className='col s3 timegamemin'><p>{game.timestart}</p></div>
                                    {game.vyezd == 0 ? <div className='col s6 titlemin doma'><p>Игра дома</p></div> : <div className='col s6 titlemin vyezd'><p>Выезд</p></div>}
                                    {moment(game.date, "M/D/Y").valueOf() < moment(currDate).valueOf() ? <div className='col s3 status statuspassed'><p>Проведена</p></div> : game.prepay !=0 ? <div className='col s3 status prepayed'><p>{moment(game.date).format('D/M/Y')}</p></div> : <div className='col s3 status unprepayed'><p>{moment(game.date).format('D/M/Y')}</p></div>}</div>
                                    
                            )
                        }
                    )
                }
            </div>
        </div>
        </div>
    )
}

export default Daypage