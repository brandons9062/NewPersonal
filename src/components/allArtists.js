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
                <Link to={`/users/${artist.id}`} className="col-sm-3 genreName listItemDiv grow" key={artist.id}>
                    <div className="list-group-item individualListItem">
                        <h6 className="genreName">{artist.displayname}</h6>
                    </div>
                </Link>
            );
        })
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row pageTitleDiv">
                    <h3 className="pageTitle">Find an Artist</h3>
                </div>
                <div className="row pageListUlDiv">
                    <ul className="list-group pageUl">
                        {this.renderArtists()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {artists: state.artists};
}

export default connect(mapStateToProps, {getArtists})(AllArtists);