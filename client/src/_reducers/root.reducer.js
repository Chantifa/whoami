import {combineReducers} from 'redux';

import authentication from './authentication.reducer.js';
import registration from './registration.reducer.js';
import users from './users.reducer.js';
import alert from './alert.reducer.js';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert
});

export default rootReducer