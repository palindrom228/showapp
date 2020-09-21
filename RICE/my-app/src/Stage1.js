import React, { useState} from 'react';
import Header from './Header'

import { register } from './serviceWorker';

function Stage1() {

  return (
    
    <div className='PlayGround'>
           <div className='teamgame'>
    <p className='nametag'></p>
                <div className="balls"><p></p></div>
                <i className="fa fa-plus-circle" aria-hidden="true" onClick=''></i>
           </div>
            <div className='concursnum'><p>Конкурс №</p></div>
           <div className='teamgame'>
    <p className='nametag'></p>
                <div className="balls"><p></p></div>
                <i className="fa fa-plus-circle" aria-hidden="true" onClick=''></i>
           </div>
           <div className='blockresult'>
           <input className='nametag'  value='Результат конкурса'></input>
           </div>
       </div>
    
  )
}


export default Stage1;
