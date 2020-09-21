import React, { useState } from 'react'
import moment from 'moment'

export const Staticlist = ({ statika,startDate,endDate}) => {
    const rabs = {
        0: '5f5beb6628bf011b90d9af55',
        1: 'Никита',
        2: '5f5bed21014e6e1f544e214c',
        3: 'Никита',
        4: '5f5bed73014e6e1f544e214d',
        5: 'Никита',
        6: '5f5bee12014e6e1f544e214e',
        7: 'Никита',
        8: '5f5bee26014e6e1f544e214f',
        9: 'Никита',
        10: '5f5bee36014e6e1f544e2150'
    
      }
    if(!statika.length) {
        return <p className='center white-text'>Игры небыло</p>
    }

    return(
        <div className="container">
            { statika.map((game) => {
                if (moment(game.date, "HH:mm  M/D/Y").valueOf() > Date.parse(startDate) && moment(game.date, "HH:mm  M/D/Y").valueOf() < Date.parse(endDate)){
                return(
                <div className='row'>
                    <ul className="collection blue darken-1 with-header">
                <li className="collection-header"><h4>Дата игры:  {game.date}</h4></li>
                <li className="collection-item">Сумма оплаты за игру:  {game.pay}</li>
                <li className="collection-item">Сумма предоплаты:  {game.prepay}</li>
                <li className="collection-item">Количество играющих:  {game.colpep}</li>
                <li className="collection-item">Ведущий:  {game.tamada}</li>
                <li className="collection-item">Звукач:  {game.zvuk}</li>
                <li className="collection-item">Бальник:  {game.balman}</li>
</ul>

                </div>
                )}
            })}
        </div>
    )
}