import React from 'react';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';
import TimePicker from './TimePicker';
import MockItemUtil from '../utils/MockItemUtil';

class DayPicker extends React.Component {
    

    state = {
        day: this.props.day,
        timeItems: this.props.timeItems || [MockItemUtil.GetNewTimeItem()]
      };


      handleChange = (e) => {
        this.setState({
          day: e.target.value
        });
        this.props.handleItemChange('day', e.target.value)
      };


    componentWillReceiveProps(nextProps){
        if(this.props.day !== nextProps.day)
            this.setState({day: nextProps.day})
    }

    addTimeItem = () => {
        var newTimeItems = this.state.timeItems
        newTimeItems.push(MockItemUtil.GetNewTimeItem())
        this.setState({timeItems: newTimeItems})
    }

    deleteTimeItem = (key) => {
        var newTimeItems = this.state.timeItems
        newTimeItems.splice(key, 1);
        this.setState({timeItems: newTimeItems})
    }

    render (){

        return (
            <div className='row  mt-5'>
                <div className='col-md-2 mt-1'>
                    <select className='form-control' value={this.state.day} onChange={this.handleChange}>
                        {moment.weekdays(true).map((day, index) => { return (<option key={index} value={((index+1)%7)}>{day}</option>) })}
                    </select>
                </div>
                <div className='col-md-10'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <p className= 'mt-1'>Hora </p>
                            <p className= 'mt-1'>Minuto </p>
                            <p className= 'mt-1'>Cupos </p>
                        </div>  
                        {this.state.timeItems.map((item, index) => { 
                            return (
                                <TimePicker 
                                    key={index}
                                    index={index} 
                                    hour={item.hour} 
                                    minute={item.minute} 
                                    capacity={item.capacity}
                                    handleItemDelete={this.deleteTimeItem}
                                    handleItemChange={(property, value) => {
                                            var timeItems = this.state.timeItems;
                                            timeItems[index] = { ...item, [property]: value };
                                            this.setState({timeItems: timeItems});
                                        }}
                                />
                            )
                        })}
                        <div className='col-md-2'>
                            <button className='btn btn-light' onClick={this.addTimeItem}>+Agregar</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default DayPicker;