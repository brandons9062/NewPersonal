import _ from 'lodash';
import {GET_ARTISTS} from '../actions';

export default function(state = {}, action){
    switch (action.type){
        case GET_ARTISTS:
            return _.mapKeys(action.payload.data, 'id');
        default:
            return state;
    }
}