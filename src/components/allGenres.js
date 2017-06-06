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
                <div className="col-sm-3 listItemDiv grow" key={genre.id}>
                    <li className="list-group-item individualListItem">
                        <Link to={`/genres/${genre.id}`}>
                            <h6>{genre.genrename}</h6>
                        </Link>
                    </li>
                </div>
            );
        })
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row pageTitle">
                    <h3>Choose a Genre</h3>
                </div>
                <div className="row pageListUlDiv">
                    <ul className="list-group">
                        {this.renderGenres()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {genres: state.genres};
}

export default connect(mapStateToProps, {getGenres})(AllGenres);