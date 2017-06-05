import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getTracks} from '../actions';
import _ from 'lodash';

class AllTracks extends Component {
    componentDidMount(){
        this.props.getTracks();
    }
    
    renderTracks(){
        return _.map(this.props.tracks, track => {
            return (
                <li className="list-group-item" key={track.id}>
                    <Link to={`/tracks/${track.id}`}>
                        <div>
                            {track.trackname}
                            <img src={track.img} />
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
                    <h3>Find a Track</h3>
                    
                </div>
                <ul className="list-group">
                    {this.renderTracks()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {tracks: state.tracks};
}

export default connect(mapStateToProps, {getTracks})(AllTracks);