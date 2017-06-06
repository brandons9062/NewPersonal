import _ from 'lodash';
import {GET_USERS, GET_USER} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_USERS:
            return _.mapKeys(action.payload.data, 'id');
        case GET_USER:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}