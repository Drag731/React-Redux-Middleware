import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker.js';
import About from './Features/About/About.js'
import Home from './Features/Home/Home.js'
import MainPage from './Features/MainPage/MainPage.js';
import EditMovieForm from './Features/Form/EditMovieForm.js';
import CreateMovieForm from './Features/Form/CreateMovieForm.js';
import configureStore from './configure-store.js';

const store = configureStore();


ReactDOM.render(
            <Provider store={store}>
                <Router history={browserHistory}>
                    <Route path='/' component={App}>
                        <IndexRoute component={MainPage} />
                        <Route path='movies' component={MainPage} />
                        <Route path='/movies/:id' component={MainPage} />
                        <Route path='editMovie' component={EditMovieForm} />
                        <Route path='createMovie' component={CreateMovieForm} />
                        <Route path='home' component={Home} />
                        <Route path='about' component={About} />
                    </Route>
                </Router>
            </Provider>, document.getElementById('root'));

registerServiceWorker();
store.subscribe(() =>
    console.log('store', store.getState())
)
