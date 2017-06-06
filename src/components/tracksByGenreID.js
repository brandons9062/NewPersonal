import React, {Component} from 'react';
import {getTracksByGenre} from '../actions';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

class TracksByGenreID extends Component {
    
    componentDidMount() {
        const {id} = this.props.match.params;
        
        this.props.getTracksByGenre(id);
    }
    
    renderGenreTracks(){
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
    
    render(){
        
        return (
            <div>
                <ul className="list-group">
                    {this.renderGenreTracks()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {tracks: state.tracks};
}

export default connect(mapStateToProps, {getTracksByGenre})(TracksByGenreID);