import _ from 'lodash';
import {GET_TRACKS} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_TRACKS:
            return _mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}