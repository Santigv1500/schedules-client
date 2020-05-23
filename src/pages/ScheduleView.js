import React from 'react';
import Services from '../utils/Services';
import moment from 'moment';
import 'moment/locale/es' 
import { Link } from "react-router-dom";

class ScheduleView extends React.Component {

    state = {
        loading: false,
        items: []
      };

    constructor(props){
        super(props);
        moment.locale('es');
    }


    render (){

        return (
            <div className='col-md-12'>
                <div className="row">
                    <div className="row col-12 mt-3 mb-2">
                        <div className='col-md-2'>
                            <h1>Mis horarios</h1>
                        </div>
                        <div className='col-md-6 mt-1'>
                            <Link className="btn btn-success" to="/schedule_form">Agregar nuevo horario</Link>
                        </div>
                    </div>
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Hora</th>
                                    <th>Cupos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.loading && (<tr><td colspan='3' className='text-center'>Cargando...</td></tr>)}
                                {this.state.items.map(
                                    (item) => {
                                        return (
                                            <tr key={item.id}>
                                                <td>{moment(item.date).utc().format('dddd: MMMM-D')}</td>
                                                <td>{moment(item.date).utc().format('HH:mm')}</td>
                                                <td>{item.capacity}</td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                        <div className="text-center">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount(){
        this.setState({loading: true})
        var funcCall = async ()=>{
            try {
                var response = await Services.GetItems('/schedule_dates');
                this.setState({items: response.data, loading: false})
            } catch (error) {
                
            }
        }
        setTimeout(function() {
            funcCall();      
        }, 500);
    }

}

export default ScheduleView;