import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getProducers} from '../actions';
import _ from 'lodash';

class AllProducers extends Component {
    componentDidMount(){
        this.props.getProducers();
    }
    
    renderProducers(){
        return _.map(this.props.producers, producer => {
            return (
                <Link to={`/users/${producer.id}`} className="col-sm-3 genreName listItemDiv grow" key={producer.id}>
                    <div className="list-group-item individualListItem">
                        <h6 className="genreName">{producer.displayname}</h6>
                    </div>
                </Link>
            );
        })
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row pageTitleDiv">
                    <h3 className="pageTitle">Find a Producer</h3>
                </div>
                <div className="row pageListUlDiv">
                    <ul className="list-group pageUl">
                        {this.renderProducers()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {producers: state.producers};
}

export default connect(mapStateToProps, {getProducers})(AllProducers);