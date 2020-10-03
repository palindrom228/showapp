import React, { useEffect, useState } from 'react'
import moment from 'moment'

export const Calendaritem = ({currDate,table,rowscol,zpstat,select}) =>{

    return(
        <tbody>
            {
                table.map((week, i, table) => {
                    if(rowscol <= 5 && rowscol > 4){
                    return(
                        <tr className='tabrow'>
                            {week.map((day,i) => {
                                var gamestab = {date: moment(day).format('D'), games: []}
                                zpstat.map((game,i)=>{
                                    
                                    if(moment(game.date,'D/M/Y').format('D/M/Y') == moment(day).format('D/M/Y'))
                                    {
                                        
                                        gamestab.games[i] = <p className={game.vyezd == 0 ? 'minigame' : 'minigame vyezd'}>{game.timestart}</p>
                                    }
                                })
                                if(moment(currDate).format('D/M/Y') == moment(day).format('D/M/Y')){
                                    return(
                                        <td className='tablew thisdate' onClick={select} name={day}>
                                    <div className="minicart" name={day}>
                                        <p className={i == 5 || i == 6 ? "weekend" : "simple"}>{gamestab.date}</p>
                                        {gamestab.games.map((gigena)=> {
                                            return(gigena)
                                        })}
                                    </div>
                                </td>
                                    )
                                }
            
                                return(
                                <td className='tablew' onClick={select} name={day}>
                                    <div className="minicart" name={day}>
                                        <p className={i == 5 || i == 6 ? "weekend" : "simple"}>{gamestab.date}</p>
                                        {gamestab.games.map((gigena)=> {
                                            return(gigena)
                                        })}
                                    </div>
                                </td>
                                )
                            })}
                        </tr>
                    )
                }
                if(rowscol > 5 ){
                    return(
                        <tr className='sixrow'>
                            {week.map((day,i) => {
                                var gamestab = {date: moment(day).format('D'), games: []}
                                zpstat.map((game,i)=>{
                                    if(moment(game.date,"D/M/Y").format('D/M/Y') == moment(day).format('D/M/Y'))
                                    {
                                        gamestab.games[i] = <p className={game.vyezd == 0 ? 'minigame' : 'minigame vyezd'}>{game.timestart}</p>
                                        
                                    }
                                })
                                if(moment(currDate).format('D/M/Y') == moment(day).format('D/M/Y')){
                                    return(
                                        <td className='tablew thisdate' onClick={select} name={day}>
                                    <div className="minicart">
                                        <p className={i == 5 || i == 6 ? "weekend" : "simple"}>{gamestab.date}</p>
                                        {gamestab.games.map((gigena)=> {
                                            return(gigena)
                                        })}
                                    </div>
                                </td>
                                    )
                                }
                                return(
                                <td className='tablew' onClick={select} name={day}>
                                    <div className="minicart blockrowsix">
                                        <p className={i == 5 || i == 6 ? "weekend" : "simple"}>{gamestab.date}</p>
                                        {gamestab.games.map((gigena)=> {
                                            return(gigena)
                                        })}
                                    </div>
                                </td>
                                )
                            })}
                        </tr>
                    )
                }if(rowscol == 4){
                    return(
                        <tr className='fourrow'>
                            {week.map((day,i) => {
                                var gamestab = {date: moment(day).format('D'), games: []}
                                zpstat.map((game,i)=>{
                                    if(moment(game.date,"D/M/Y").format('D/M/Y') == moment(day).format('D/M/Y'))
                                    {
                                        gamestab.games[i] = <p className={game.vyezd == 0 ? 'minigame' : 'minigame vyezd'}>{game.timestart}</p>
                                        
                                    }
                                })
                                if(moment(currDate).format('D/M/Y') == moment(day).format('D/M/Y')){
                                    return(
                                        <td className='tablew thisdate' onClick={select} name={day}>
                                    <div className="minicart">
                                        <p className={i == 5 || i == 6 ? "weekend" : "simple"}>{gamestab.date}</p>
                                        {gamestab.games.map((gigena)=> {
                                            return(gigena)
                                        })}
                                    </div>
                                </td>
                                    )
                                }
                                return(
                                <td className='tablew' onClick={select} name={day}>
                                    <div className="minicart blockrowfour">
                                        <p className={i == 5 || i == 6 ? "weekend" : "simple"}>{gamestab.date}</p>
                                        {gamestab.games.map((gigena)=> {
                                            return(gigena)
                                        })}
                                    </div>
                                </td>
                                )
                            })}
                        </tr>
                    )
                }

                })
            }
        </tbody>
    )
}
export default Calendaritem