import React, { useState } from 'react'
import moment from 'moment'

export const Zpstat = ({zpstat}) => {
    const rabs = [
        {id:['5f5beb6628bf011b90d9af55','Никита','200','600','400','500','1200','300']},
        {id:['5f5bed21014e6e1f544e214c','Тумэн','200','600','400','500','1200','300']},
        {id:['5f5bed73014e6e1f544e214d','Гэсэр','200','600','400','500','1200','300']},
        {id:['5f5bee12014e6e1f544e214e','Александр','300','600','400','500','1200','300']},
        {id:['5f5bee26014e6e1f544e214f','Дандар','300','500','400','500','1200','300']},
        {id:['5f5bee36014e6e1f544e2150','Солбон','200','700','400','500','1400','300']},
        {id:['5f637472c3b38f117834d4cd','Евгений','300','600','400','500','1200','300']},
    ]
    if(!zpstat.length) {
        return <th>Игры небыло</th>
    }

    return(
        <tbody>
        {
            rabs.map((rab,i,rabs) => {
                let balls = 0
                let ved = 0
                let zvuk = 0
                let col = 0
                let ballsv = 0
                let vedv = 0
                let zvukv = 0
                let colv = 0
                let zp = 0
                zpstat.map((game,y) => {
                    if(game.week==moment().format('W')){
                    if(game.vyezd == 1){
                        if(rab.id[0]==game.tamada){
                            vedv++ 
                            colv++
                            zp = zp + Number(rab.id[6])
                        }
                        if(rab.id[0]==game.zvuk){
                            zvukv++
                            colv++
                            zp = zp + Number(rab.id[5])
                        }
                        if(rab.id[0]==game.balman){
                            ballsv++
                            colv++
                            zp = zp + Number(rab.id[7])
                        }
                    }else{
                        if(rab.id[0]==game.tamada){
                            ved++ 
                            col++
                            zp = zp + Number(rab.id[3])
                        }
                        if(rab.id[0]==game.zvuk){
                            zvuk++
                            col++
                            zp = zp + Number(rab.id[4])
                        }
                        if(rab.id[0]==game.balman){
                            balls++
                            col++
                            zp = zp + Number(rab.id[2])
                        }
                }
                
                }}
                )

                return(
                <tr>
                    <th>{rab.id[1]}</th>
                    <th>{balls}{ballsv==0 ? "" : `(${ballsv})`}</th>
                    <th>{ved}{vedv==0 ? "" : `(${vedv})`}</th>
                    <th>{zvuk}{zvukv==0 ? "" : `(${zvukv})`}</th>
                    <th>{col}{colv==0 ? "" : `(${colv})`}</th>
                    <th>{zp}</th>
                </tr>
                )
            }) 
        }
        </tbody>
    )
}
export default Zpstat