import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';
import $ from 'jQuery';

import reducers from './reducers';
import MainNav from './components/mainNav';
import Home from './components/homeContainer';
import AllGenres from './components/allGenres';
import TracksByGenreID from './components/tracksByGenreID';
import AllTracks from './components/allTracks';
import TrackByTrackID from './components/tracksByTrackID';
import AllProducers from './components/allProducers';
import AllArtists from './components/allArtists';
import UploadTrack from './components/uploadTrack';
import UserByID from './components/userByID';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);



class Test extends Component {
    render() {
        return <div className="container">TEST!</div>
    } 
}
 
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
        <BrowserRouter>
            <div>
                <MainNav />
                <Switch>
                    <Route path='/tracks/new' component={UploadTrack} />
                    <Route path='/tracks/:id' component={TrackByTrackID} />
                    <Route path='/tracks' component={AllTracks} />
                    <Route path='/genres/:id' component={TracksByGenreID} />
                    <Route path='/genres' component={AllGenres} />
                    <Route path='/producers' component={AllProducers} />
                    <Route path='/artists' component={AllArtists} />
                    <Route path='/users/:id' component={UserByID} />
                    <Route path='/' component={Home} />
                </Switch>
            </div> 
        </BrowserRouter>
    </Provider>
    , document.querySelector('.reactContainer'));