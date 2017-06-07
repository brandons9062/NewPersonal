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
                <Link to={`/tracks/${track.id}`} className="col-sm-3 genreName listItemDiv grow" key={track.id}>
                    <div className="list-group-item individualListItem">
                        <h6 className="genreName">{track.trackname}</h6>
                    </div>
                </Link>
            );
        })
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row pageTitleDiv">
                    <h3 className="pageTitle">Find a Track</h3>
                </div>
                <div className="row pageListUlDiv">
                    <ul className="list-group pageUl">
                        {this.renderTracks()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {tracks: state.tracks};
}

export default connect(mapStateToProps, {getTracks})(AllTracks);