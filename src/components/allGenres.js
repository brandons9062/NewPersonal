import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getGenres} from '../actions';
import _ from 'lodash';

class AllGenres extends Component {
    componentDidMount(){
        this.props.getGenres();
    }
    
    renderGenres(){
        return _.map(this.props.genres, genre => {
            return (
                <li className="list-group-item" key={genre.id}>
                    <Link to={`/genres/${genre.id}`}>{genre.genrename}</Link>
                </li>
            );
        })
    }
    
    render() {
        const brandon = 'cool';
        return (
            <div>
                <h3>Find a Genre</h3>
                <ul className="list-group">
                    {this.renderGenres()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {genres: state.genres};
}

export default connect(mapStateToProps, {getGenres})(AllGenres);