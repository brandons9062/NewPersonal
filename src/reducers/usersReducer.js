import _ from 'lodash';
import {GET_USERS} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_USERS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}