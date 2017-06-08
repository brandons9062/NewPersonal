import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTrackByID} from '../actions';
import {Link} from 'react-router-dom';

class TrackByTrackID extends Component {
    
    componentDidMount() {
        const {id} = this.props.match.params;
        
        this.props.getTrackByID(id);
    }
    
    render(){
        
        const {track} = this.props;
        
        if(!track) {
            return (
                <div>Loading...</div>
            )
        }
        
        return (
            <div>
                <h3>{track.img}</h3>
                <h6>{track.trackname}</h6>
                <p>{track.price}</p>
            </div>
        );
    }
}

function mapStateToProps({tracks}, ownProps){
    return {
        track: tracks[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {getTrackByID})(TrackByTrackID);