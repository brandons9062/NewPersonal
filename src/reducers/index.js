import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import GenresReducer from './genresReducer';
import TracksReducer from './tracksReducer';
import AuthReducer from './authReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    tracks: TracksReducer,
    genres: GenresReducer,
    form: formReducer
});

export default rootReducer;