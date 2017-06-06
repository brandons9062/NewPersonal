import _ from 'lodash';
import {GET_TRACKS, GET_TRACKSBYGENRE} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_TRACKS:
            return _.mapKeys(action.payload.data, 'id');
        case GET_TRACKSBYGENRE:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}