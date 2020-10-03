import React, { useContext, useState } from 'react'
import 'materialize-css'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import moment from 'moment'
import Header from './Header'




function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  const now = new Date();
  const rabs = {
    1: '5f5beb6628bf011b90d9af55',
    2: '5f5bed21014e6e1f544e214c',
    3: '5f5bed73014e6e1f544e214d',
    4: '5f5bee12014e6e1f544e214e',
    5: '5f5bee26014e6e1f544e214f',
    6: '5f5bee36014e6e1f544e2150',
    7: '5f637472c3b38f117834d4cd'

  }
  const [nameteam, setName1] = useState({
    nametag1: '',
    nametag2: '',
    col: '',colpep: '', pay: 0, prepay: 0, tamada: 22, balman: 22 , zvuk: 22, date: moment().format('HH:mm  M/D/Y') , week: moment().format('W'), vyezd: 0,sale: 0
  })
  const vyezdy = () => {
    if(nameteam.vyezd == 0){
    setName1({...nameteam, vyezd: 1})
  }else{
    setName1({...nameteam, vyezd: 0})
  }
  }
  const createName1 = event => {
      setName1({...nameteam, [event.target.name]: event.target.value})
  }
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId,rabs, isAuthenticated,createName1,nameteam,vyezdy
    }}>
    <Header>
    </Header>
    <Router>
      {routes}
    </Router>
    </AuthContext.Provider>
  );
}

export default App;
