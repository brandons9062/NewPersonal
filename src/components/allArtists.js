import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getArtists} from '../actions';
import _ from 'lodash';

class AllArtists extends Component {
    componentDidMount(){
        this.props.getArtists();
        console.log(this.props.artists);
    }
    
    renderArtists(){
        return _.map(this.props.artists, artist => {
            return (
                <li className="list-group-item" key={artist.id}>
                    <Link to={`/artists/${artist.id}`}>
                        <div>
                            {artist.displayname}
                        </div>
                    </Link>
                </li>
            );
        })
    }
    
    render() {
        return (
            <div>
                <div>
                    <h3>Find a Artist</h3>
                    
                </div>
                <ul className="list-group">
                    {this.renderArtists()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {artists: state.artists};
}

export default connect(mapStateToProps, {getArtists})(AllArtists);