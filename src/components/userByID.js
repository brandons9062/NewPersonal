import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUser} from '../actions';
import {Link} from 'react-router-dom';

class UserByID extends Component {
    
    componentDidMount() {
        const {id} = this.props.match.params;
        
        this.props.getUser(id);
    }
    
    render(){
        
        const {user} = this.props;
        
        if(!user) {
            return (
                <div>Loading...</div>
            )
        }
        
        return (
            <div>
                
                <h3>{user.displayname}</h3>
                <h6>{user.description}</h6>
                <p>{user.website}</p>
                
            </div>
        );
    }
}

function mapStateToProps({users}, ownProps){
    return {
        user: users[ownProps.match.params.id]
    };
}

export default connect(mapStateToProps, {getUser})(UserByID);