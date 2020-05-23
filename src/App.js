import React from 'react';
import ScheduleForm from './pages/ScheduleForm';
import ScheduleView from './pages/ScheduleView';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ScheduleView/>
        </Route>
        <Route path="/schedule_form">
          <ScheduleForm/>
        </Route>
      </Switch>
      <footer className="page-footer">
        <div className="text-right p-2">
          <span>Desarrollado por: Santiago Gómez Vásquez</span>
        </div>
      </footer>
    </Router>
  );
}

export default App;
