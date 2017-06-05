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
                <li className="list-group-item" key={producer.id}>
                    <Link to={`/producers/${producer.id}`}>
                        <div>
                            {producer.displayname}
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
                    <h3>Find a Producer</h3>
                    
                </div>
                <ul className="list-group">
                    {this.renderProducers()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {producers: state.producers};
}

export default connect(mapStateToProps, {getProducers})(AllProducers);