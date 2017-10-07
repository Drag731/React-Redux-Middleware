import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

// import logger from './Middlewares/logger';
const middlewares = applyMiddleware(thunk);

const configureStore = () => {
    return createStore(
        reducers,
        middlewares
    );
};

export default configureStore;