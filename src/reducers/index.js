import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import GenresReducer from './genresReducer';
import TracksReducer from './tracksReducer';
import UsersReducer from './usersReducer';

const rootReducer = combineReducers({
    genres: GenresReducer,
    form: formReducer
});

export default rootReducer;