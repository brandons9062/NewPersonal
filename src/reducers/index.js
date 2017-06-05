import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import GenresReducer from './genresReducer';
import TracksReducer from './tracksReducer';
import AuthReducer from './authReducer';
import UsersReducer from './usersReducer';
import ProducersReducer from './producersReducer';
import ArtistsReducer from './artistsReducer';

const rootReducer = combineReducers({
    auth: AuthReducer,
    tracks: TracksReducer,
    genres: GenresReducer,
    users: UsersReducer,
    producers: ProducersReducer,
    artists: ArtistsReducer,
    form: formReducer
});

export default rootReducer;