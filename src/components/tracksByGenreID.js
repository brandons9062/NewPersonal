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
                <Link to={`/tracks/${track.id}`} className="col-sm-3 genreName listItemDiv grow" key={track.id}>
                    <div className="list-group-item individualListItem">
                        <h6 className="genreName">{track.trackname}</h6>
                    </div>
                </Link>
            );
        })
    }
    
    render(){
        
        return (
            <div className="container-fluid">
                <div className="row pageTitleDiv">
                    <h3 className="pageTitle">Find a Track</h3>
                </div>
                <div className="row pageListUlDiv">
                    <ul className="list-group pageUl">
                        {this.renderGenreTracks()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        tracks: state.tracks
           };
}

export default connect(mapStateToProps, {getTracksByGenre})(TracksByGenreID);