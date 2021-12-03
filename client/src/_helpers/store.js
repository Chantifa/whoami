import {applyMiddleware, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from "../_reducers/root.reducer.js";

const loggerMiddleware = createLogger()

const store = createStore(
    rootReducer,
    process.env.REDUX_LOGGING ? applyMiddleware(thunkMiddleware, loggerMiddleware) : applyMiddleware(thunkMiddleware)
);

export default store