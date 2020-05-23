import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class TimePicker extends React.Component {


    state = {
        hour: this.props.hour,
        minute: this.props.minute,
        capacity: this.props.capacity || 0
      };


      handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });

        this.props.handleItemChange(e.target.name, e.target.value);
      };


      handleDelete = () => {
        this.props.handleItemDelete(this.props.index);
      };


    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            this.setState({ hour: nextProps.hour,
                            minute: nextProps.minute,
                            capacity: nextProps.capacity})
        }  
    }

    hours = [...Array(24).keys()].map(item => {
        var hour = item < 10 ? '0' + item : item
        return (<option key={item} value={item}>{hour}</option>)
    })

    minutes = [...Array(60).keys()].map(item => {
        var minute = item < 10 ? '0' + item : item
        return (<option key={item} value={item}>{minute}</option>)
    })

    render (){
        return (
            <div className='col-md-2 mb-2'>
                <select className='form-control  mt-1' name='hour' value={this.state.hour} onChange={this.handleChange}>
                    {this.hours}
                </select>
                <select className='form-control  mt-1' name='minute' value={this.state.minute} onChange={this.handleChange}>
                    {this.minutes}
                </select>
                <input className='form-control  mt-1' type='number' min='0'  name='capacity' value={this.state.capacity} onChange={this.handleChange}/>
                {this.props.index > 0 && (<div className='text-center mt-1'><b onClick={this.handleDelete} title='eliminar' style={{color: 'red', cursor: 'pointer' }}>x</b></div>)}
            </div>
        )
    }

}

export default TimePicker;