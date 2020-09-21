import React, {useState, useCallback, useContext} from 'react'
import { AuthContext } from '../context/AuthContext'

export const Gamepage = (name) => {
    const {nameteam} = useContext(AuthContext)
    const [gamedata,setGamedata] = useState({
        colcon: Number(nameteam.col),
        balls1: 0, balls2: 0, ballsmain1: 0, ballsmain2: 0, c: 1, bal: 1
    })

    const changehandler = event => {
        setGamedata({...gamedata, bal: Number(event.target.value)})
    }
    const boom1 = () => {
        if(gamedata.c == 2){
            setGamedata({
            ...gamedata,
            ballsmain2: gamedata.ballsmain2 + gamedata.balls2,
            balls1: 0,
            balls2: 0
            
            })
            console.log(name)
        }
    }
    const boom2 = () => {
        if(gamedata.c == 2){
            setGamedata({
            ...gamedata,
            ballsmain1: gamedata.ballsmain1 + gamedata.balls1,
            balls1: 0,
            balls2: 0
            })
        }
    }
    const nextstage = () => {
        if (gamedata.colcon != 0){
                console.log(gamedata.colcon)
                setGamedata({
                    ...gamedata,
                     ballsmain1: gamedata.ballsmain1 + gamedata.balls1,
                     ballsmain2: gamedata.ballsmain2 + gamedata.balls2,
                     balls2: 0,
                     balls1: 0,
                     colcon: gamedata.colcon - 1,
                     c: gamedata.c + 1
                }
                )
                console.log(gamedata)
        }else{
            console.log(gamedata.colcon)
            setGamedata({
                ...gamedata,
                 ballsmain1: gamedata.ballsmain1 + gamedata.balls1,
                 ballsmain2: gamedata.ballsmain2 + gamedata.balls2,
                 balls2: 0,
                 balls1: 0,
                 colcon: gamedata.colcon - 1,
                 c: gamedata.c + 1
            }
            )
                console.log(gamedata,"все, конец") 
                document.location.href = '/'
        }
        }
        const func1 = (col) => {
            col = '';
            if(gamedata.colcon != 0){
                col = nameteam.col - (nameteam.col - gamedata.c)
            return(<p className="col s9 concursnum">КОНКУРС №{col}</p>)
            }else{
                return(<p className="col s9 concursnum">Конец игры</p>)
            }
        } 
            const inc1 = () => {
                setGamedata({...gamedata, balls1: gamedata.balls1 + gamedata.bal})
                console.log(gamedata.balls1)
            }
            const inc2 = () => {
                setGamedata({...gamedata, balls2: gamedata.balls2 + gamedata.bal})
                console.log(gamedata.balls2)
            }
    
    return(
        <div className="container">
               <div className="row">
                    <button className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">{nameteam.nametag1}</button>
                    <button onClick={inc1} className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="balls1">прибавить баллы {gamedata.balls1}</button>
               </div>
               <div className="row">
                    {func1()}
                    <div className="input-field col s3 ">
                        <input id="nametag" name='bal' type="number" className="validate" onChange={changehandler} />
                        <label htmlFor="nametag">Balls</label>
                    </div>
               </div>
               <div className="row">
               <button className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">{nameteam.nametag2}</button>
                <button onClick={inc2} className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="balls2">прибавить баллы {gamedata.balls2}</button>
               </div>
               <div className="row">
                    <button className="navigator-menu btn waves-effect waves-light col s5 " type="submit" name="action" onClick={boom1}>Взрыв 1</button>
                    <button className="navigator-menu btn waves-effect waves-light col s5 offset-s2" type="submit" name="action" onClick={boom2}>Взрыв 2</button>
               </div>
               <div className="row">
                    <button className="navigator-menu btn waves-effect waves-light col s12 " type="submit" name="action"> "{gamedata.name1}" {gamedata.ballsmain1} || {gamedata.ballsmain2} "{gamedata.name2}"</button>
                    <button onClick={nextstage} className="navigator-menu btn waves-effect waves-light col s12 " type="submit" name="action">РЕЗУЛЬТАТЫ КОНКУРСА</button>
               </div>
        </div>
    )
}