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
import GenreByID from './components/genreByID';
import AllTracks from './components/allTracks';
import AllProducers from './components/allProducers';
import AllArtists from './components/allArtists';
import UploadTrack from './components/uploadTrack';

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
                    <Route path='/tracks' component={AllTracks} />
                    <Route path='/genres/:id' component={GenreByID} />
                    <Route path='/genres' component={AllGenres} />
                    <Route path='/producers' component={AllProducers} />
                    <Route path='/artists' component={AllArtists} />
                    <Route path='/' component={Home} />
                </Switch>
            </div> 
        </BrowserRouter>
    </Provider>
    , document.querySelector('.reactContainer'));