import React from 'react'


export default function Header(){
    return  (
        <div className='header'>
            <img src='./img/logo.svg' alt='' className='logo'/>
            <div class="input-field col s6">
          <input placeholder="Placeholder" id="first_name" type="text" class="validate"/>
          <label for="first_name">First Name</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate"/>
          <label for="last_name">Last Name</label>
        </div>
        </div>
    )
}