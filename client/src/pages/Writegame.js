import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component, useEffect, useState } from 'react'
import moment from 'moment'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import 'moment/locale/ru'
import { layer } from '@fortawesome/fontawesome-svg-core'
import M from 'materialize-css/dist/js/materialize'
import ReactDOM from 'react-dom';
import 'moment/locale/es-us'
import {IMaskInput} from 'react-imask';
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

class Writegame extends Component {
    
    componentDidMount() {
        moment.locale('es-us')
            var context = this
            var elemsstart = document.querySelectorAll('.timepickerstart');
            var elemsend = document.querySelectorAll('.timepickerend');
            var sel = document.querySelectorAll('select');
            M.FormSelect.init(sel, {});
            M.Timepicker.init(elemsstart, {
            onCloseEnd: context.handleDate,
            });
            M.Timepicker.init(elemsend, {
                onCloseEnd: context.handleDateend,
                });
          }
constructor(props){
    super(props);
    this.state = {
        date: moment(Number(this.props.dd)).format('D/M/Y'),
        timestart: '',
        timeend: '',
        zakazchik: '',
        vyezd: 0,
        company: 0,
        companyname: '',
        adres: '',
        old: '',
        povod: '',
        Summ: '',
        col: '',
        month: moment(Number(this.props.dd)).format('M/Y'),
        week: moment(Number(this.props.dd)).format('W'),
        prepay: '',
        phone: '',
        status: 0,
        arenda: 0,
        name: ''
    }
    this.timestart = React.createRef();
    this.timeend = React.createRef();
}

handleChange=(e)=>{
    this.setState({[e.target.name]: e.target.value})
    console.log(this.state)
}
handleDate=()=>{
    console.log()
    this.setState({
        timestart: moment(this.timestart.current.value, 'LT').format('HH:mm'),
        timeend: moment(this.timestart.current.value, 'LT').add(1,'h').format('HH:mm')
    })
    console.log(this.state.timestart)
    console.log(this.state.timeend)
}
handleDateend=()=>{
    this.setState({
        timeend: this.timeend.current.value
    })
    console.log(this.state.timeend)
}
handler=(event)=>{
    if(this.state[event.target.name]== 0){this.setState({[event.target.name]: 1})}
    if(this.state[event.target.name]== 1){this.setState({[event.target.name]: 0})}
    console.log(this.state)
}
creategame=()=>{
    var flag = 0
            if(this.state.timestart == ''){window.M.toast({html: 'Заполните время начала игры'}); flag = 1; }
            if(this.state.name == ''){window.M.toast({html: 'Заполните Имя заказчика'}); flag = 1;}
            if(this.state.old == ''){window.M.toast({html: 'Возрастную категорию'}); flag = 1;}
            if(this.state.povod == ''){window.M.toast({html: 'Заполните где будет проходить игра'}); flag = 1;}
            if(this.state.Summ == ''){window.M.toast({html: 'Заполните тип мероприятия'}); flag = 1;}
            if(this.state.col == ''){window.M.toast({html: 'Заполните сумму к оплате'}); flag = 1;}
            
    if(flag==0){
        this.props.create(this.state)
}}
    render(){
        return(
        <div className="daytable writegame" id='datday'>
            <div className='container'>
                <div className='row'>
                <div className="input-field col s5">
                  <input type="text" name="timestart"  id='timestart'className='timepickerstart' ref={this.timestart}></input>
                  <label htmlFor="timestart" >Начало</label>
                </div>
                <div className="input-field col s5 offset-s2">
                  <input type="text" name="timeend" id='timesend'className='timepickerend' ref={this.timeend}></input>
                  <label htmlFor="timesend">Конец</label>
                </div>
                <div className="input-field col s12">
                   <input id="name" name='name' type="text" className="validate" onChange={this.handleChange}/>
                   <label htmlFor="name">Имя заказчика</label>
                 </div>
                 <div className="input-field col s12">
                 <IMaskInput
                      name='phone'
                      id='phone'
                      onChange={this.handleChange}
                      type='text'
                      mask='+{7}(000)000-00-00'
                      radix="."
                      className="validate"
                      unmask={true} // true|false|'typed'
                      inputRef={el => this.input = el}  // access to nested input
                      // DO NOT USE onChange TO HANDLE CHANGES!
                      // USE onAccept INSTEAD
                      onAccept={
                        // depending on prop above first argument is
                        // `value` if `unmask=false`,
                        // `unmaskedValue` if `unmask=true`,
                        // `typedValue` if `unmask='typed'`
                        (value, mask) => console.log(value)
                      }
                      // ...and more mask props in a guide
                  
                      // input props also available
                      
                    />
                   <label htmlFor="phone">Номер телефона</label>
                 </div>
                 <div className="col s12"> 
                 <p>
                  <label>
                    <input type="checkbox" name="company" onChange={this.handler}/>
                    <span>Организация</span>
                  </label>
                </p>
                </div>
                { this.state.company == true ? <div className="input-field col s12">
                   <input id="company" name='companyname' type="text" className="validate" onChange={this.handleChange}/>
                   <label htmlFor="company">Название организации</label>
                 </div> : ''
                 }
                 <div className="col s12"> 
                 <p>
                  <label>
                    <input type="checkbox" name="vyezd" onChange={this.handler}/>
                    <span>Выезд</span>
                  </label>
                </p>
                </div>
                { this.state.vyezd == true ? <div className="input-field col s12">
                   <input id="adres" name='adres' type="text" className="validate" onChange={this.handleChange}/>
                   <label htmlFor="adres">Адрес</label>
                 </div> : ''
                 }
                 <div className="input-field col s12">
                  <select name="old" onChange={this.handleChange}>
                    <option value="" disabled selected> Возрастная категория</option>
                    <option value="1">Дети: 6 - 12</option>
                    <option value="2">Дети: 13 - 15</option>
                    <option value="3">Дети: 15 - 17</option>
                    <option value="4">Взрослые: 18 - 26</option>
                    <option value="5">Взрослые: 27 - 35</option>
                    <option value="6">Взрослые: 36+</option>
                  </select>
                  <label></label>
                </div>
                <div className="input-field col s12">
                  <select name="povod" onChange={this.handleChange}>
                    <option value="" disabled selected> Выберите тип праздника</option>
                    <option value="1">Без повода</option>
                    <option value="2">Корпоратив</option>
                    <option value="3">Свадьба</option>
                    <option value="4">ДР</option>
                    <option value="5">Детский Утренник</option>
                    <option value="6">Мальчишник</option>
                    <option value="7">Девишник</option>
                  </select>
                  <label></label>
                </div>
                <div className="input-field col s12">
                   <input id="col" name='col' type="number" className="validate" onChange={this.handleChange}/>
                   <label htmlFor="col">Количество играющих</label>
                 </div>
                <div className="input-field col s12">
                   <input id="SumAll" name='Summ' type="text" className="validate" onChange={this.handleChange}/>
                   <label htmlFor="SumAll">Стоимость</label>
                 </div>
                 <button onClick={this.creategame} className="navigator-menu btn waves-effect waves-light col s12" type="submit" name="action">
            Создать игру
            </button>
                </div>
            </div>
        </div>
        )
    }
}


export default Writegame