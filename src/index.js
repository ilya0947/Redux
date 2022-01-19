import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import RestoServiceContext from './components/resto-service-context';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import ErrorBoudry from './components/error-boundry';
import RestoService from './services/resto-service';
import store from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';

const restoService = new RestoService();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ErrorBoudry>
                <RestoServiceContext.Provider value={restoService}>
                    <Router>
                        <App/>
                    </Router>
                </RestoServiceContext.Provider>
            </ErrorBoudry>
        </Provider>
    </React.StrictMode>
    , document.getElementById('root'));

