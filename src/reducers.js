import { combineReducers } from 'redux';
import MainPageReducer from './Features/MainPage/MainPageReducers.js';
import HeaderReducer from './Features/Header/HeaderReducers.js';
import { FormReducer } from './Features/Form/FormReducers.js'


export default combineReducers({
    movies: MainPageReducer,
    form: FormReducer,
    header: HeaderReducer
});