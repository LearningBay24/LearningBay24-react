import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as
  Router,
  Routes,
  Route
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './css/index.css';
import App from './components/App';
import Abgabenuebersicht from './components/Abgabenuebersicht';
import Anlegen from './components/Anlegen';
import Benachrichtigungen from './components/Benachrichtigungen';
import Institution from './components/Institution';
import Klausurenuebersicht from './components/Klausurenuebersicht';
import Kursansicht from './components/Kursansicht';
import Kursuebersicht from './components/Kursuebersicht';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Profil from './components/Profil';
import Stundenplan from './components/Stundenplan';

// Redux
import {createStore} from 'redux';
import allReducers from './reducers/reducerCollection';
import {Provider} from 'react-redux';

const store = createStore(allReducers);

ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/abgabenuebersicht" element={<Abgabenuebersicht />} />
          <Route exact path="/anlegen" element={<Anlegen />} />
          <Route exact path="/benachrichtigungen" element={<Benachrichtigungen />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/institution" element={<Institution />} />
          <Route exact path="/klausurenuebersicht" element={<Klausurenuebersicht />} />
          <Route exact path="/kursansicht" element={<Kursansicht />} />
          <Route exact path="/kursuebersicht" element={<Kursuebersicht />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/profil" element={<Profil />} />
          <Route exact path="/stundenplan" element={<Stundenplan />} />
          
        </Routes>
      </Router>
    </Provider>,
  document.getElementById('root')
);
