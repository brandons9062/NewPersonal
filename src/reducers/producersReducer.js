import _ from 'lodash';
import {GET_PRODUCERS} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_PRODUCERS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;                       
    }
}