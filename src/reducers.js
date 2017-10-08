import { combineReducers } from 'redux';
import MoviesReducer from './Features/Movies/MoviesReducers.js';
import { FormReducer } from './Features/Form/FormReducers.js'


export default combineReducers({
    movies: MoviesReducer,
    form: FormReducer
});