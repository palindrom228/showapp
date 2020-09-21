import React, {useState, useCallback, useEffect, useContext} from 'react'
import logo from '../img/logo.svg'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const Authpage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading,request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        console.log('Error', error)
        message(error)
        clearError()
    }, [error, clearError])
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data',data)
        }catch(e){}
    }
    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token ,data.userId)
        }catch(e){}
    }
    return(
        <div className="row authform">
                <img src={logo} alt='' className='logo col s4 offset-s4'/>
          <div className="input-field col s12">
            <input  id="first_name" type="text" name="email" onChange={changeHandler} className="validate" />
            <label htmlFor="first_name">Логин</label>
          </div>
          <div className="input-field col s12">
            <input id="last_name" type="password" name="password" onChange={changeHandler} className="validate" />
            <label htmlFor="last_name">Пароль</label>
          </div>
            <button onClick={loginHandler} disabled={loading} className="btn waves-effect waves-light col s4 offset-s1" type="submit" name="action">
            Войти
            </button>
            <button onClick={registerHandler} disabled={loading} className="btn waves-effect waves-light col s5 offset-s1" type="submit" name="action">
            Регистрация
            </button>

        </div>
    )
}