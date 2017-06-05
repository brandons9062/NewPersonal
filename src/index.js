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
                    <Route path='/test' component={Test} />
                    <Route path='/genres' component={AllGenres} />
                    <Route path='/' component={Home} />
                </Switch>
            </div> 
        </BrowserRouter>
    </Provider>
    , document.querySelector('.reactContainer'));