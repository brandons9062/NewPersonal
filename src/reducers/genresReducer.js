import _ from 'lodash';
import {GET_GENRES} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_GENRES:
            return _mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}