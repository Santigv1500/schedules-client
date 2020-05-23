import React from 'react';
import  DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import DayPicker from '../components/DayPicker'
import MockItemUtil from '../utils/MockItemUtil';
import Services from '../utils/Services';
import { Link } from 'react-router-dom';

registerLocale('es', es)


class ScheduleForm extends React.Component {

    state = {
        startDate: moment().toDate(),
        endDate: moment().add(7, 'days').toDate(),
        dayItems: this.props.dayItems || [MockItemUtil.GetNewDayItem()],
        loading: false,
        savedItem: false
      };


    handleStartDateChange = (date) => {
        if(this.state.endDate < date){
            this.setState({endDate: date, startDate: date})
        }
        else{
            this.setState({startDate: date})
        }
    }

    handleEndDateChange = (date) => {
        this.setState({endDate: date});       
    }

    addDayItem = () => {
        var newDayItems = this.state.dayItems
        newDayItems.push(MockItemUtil.GetNewDayItem())
        this.setState({dayItems: newDayItems})
    }

    render (){

        return (
            <div className='col-md-12'>
                <div className="row">
                <div className="row col-12 mt-3 mb-2">
                        <div className='col-md-3'>
                            <h1>Programar horario</h1>
                        </div>
                        <div className='col-md-6 mt-2'>
                            <Link className="btn btn-success" to="/">Ver horarios</Link>
                        </div>
                    </div>
                    <div className="col-12">
                        <p>
                            A continuación puedes programar las fechas en las que estará disponible la experiencia.<br/>
                            Selecciona el rango de fechas seguido por los dias y horas en que se brindara la experiencia.<br/>
                            Tambien asigna los cupos que habrá para cada uno de los horarios que se generen.
                        </p>
                    </div>
                </div>
                {this.state.loading && this.GetWaitMessage()}
                {!this.state.loading && this.state.savedItem && this.GetSavedItemMessage()}
                {!this.state.loading && !this.state.savedItem  && this.GetForm()}
            </div>
        )
    }

    GetWaitMessage(){
        return(
            <div className="row">
                <div className="col-12 text-center">
                    <span>Cargando...</span>
                </div>
            </div>
        );
    }

    GetSavedItemMessage(){
        return(
            <div className="row">
                <div className="col-12 text-center">
                    <span>Horario guardado</span>
                </div>
                <div className="col-12 text-center">
                    <Link to="/" className="btn btn-primary">Ver Horarios</Link>
                </div>
                <div className="col-md-12 mt-2 text-center">
                    <button onClick={() => { this.setState({savedItem: false})}} className="btn btn-primary">Añadir más Horarios</button>
                </div>
            </div>
        );
    }

    GetForm(){
        return (
            <React.Fragment>
                <div className='row  mt-5'>
                    <div className='col-md-2'>
                        <span>Fecha Inicio</span>
                        <DatePicker
                            className='form-control mt-2'
                            selected={this.state.startDate}
                            onChange={this.handleStartDateChange}
                            minDate={moment().toDate()}
                            locale="es"
                        />
                    </div>
                    <div className='col-md-2'>
                        <span>Fecha Finalizacion</span>
                        <DatePicker
                            className='form-control mt-2'
                            selected={this.state.endDate}
                            onChange={this.handleEndDateChange}
                            minDate={this.state.startDate}
                            locale="es"
                        />                       
                    </div>
                    <div className='col-md-2 mt-2'>
                        <br/>
                        <button className='btn btn-warning' onClick={this.saveSchedule.bind(this)}>Registrar Horario</button>
                    </div>
                </div>

                {this.state.dayItems.map((item, index) => { 
                        return (
                            <DayPicker 
                                key={index} 
                                day={item.day} 
                                timeItems={item.timeItems} 
                                handleItemChange={(property, value)=>{
                                    var dayItems = this.state.dayItems;
                                    dayItems[index] = { ...item, [property]: value };
                                    this.setState({dayItems: dayItems});
                                }} 
                            />
                        )
                 })}
                <button className='btn btn-light' onClick={this.addDayItem}>+Agregar Día</button>
            </React.Fragment>
        );
    }

    async saveSchedule(event){
        this.setState({loading: true});
        var schedule = {
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            days: this.state.dayItems.map(
                dayItem => {
                    return {
                        day: dayItem.day,
                        times: dayItem.timeItems.map(
                            timeItem => {
                                return {
                                    hour: timeItem.hour,
                                    minute: timeItem.minute,
                                    capacity: timeItem.capacity
                                }
                            }
                        )
                    }
                }
            )
        };
        
        var options = {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify(schedule)
        };

        var response = await Services.StoreItems('schedule_dates/bulk', options);

        if(response.status === 200){
            this.setState({loading: false, savedItem: true});
        } else {            
            this.setState({loading: false, savedItem: false});
        }
    }

}

export default ScheduleForm;