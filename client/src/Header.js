import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import logo from './img/logo.svg'
import MetaTags from 'react-meta-tags'

export const Header = () => {
    return(
        <div className="row head">
            <MetaTags>
              <title>ShowTodayCRM</title>
              <meta id="meta-description" name="description" content="Some description." />
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
              <meta id="og-image" property="og:image" content="./img/logo.svg" />
      </MetaTags>
            <img className="logo" src={logo} alt=""></img>
        </div>
    )
}

export default Header