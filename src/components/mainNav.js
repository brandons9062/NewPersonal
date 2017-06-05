import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {authUser, authLogout} from '../actions';

class MainNav extends Component {
    
    onLoginClick(){
        this.props.authUser();
    }
    
    onLogoutClick(){
        this.props.authLogout();
    }
    
    render() {
    
        const {isAuthenticated} = this.props.auth;
        
        const userLinks = (
            <li>
                <Link to='/' onClick={this.onLogoutClick.bind(this)}>
                    <h4 className="navbarText">Logout</h4>
                </Link>
            </li>
        );
        
        const guestLinks = (
            <li>
                <a href='http://localhost:3000/auth' >    
                    <h4 className="navbarText">Login</h4>
                </a>
            </li>
        );
        
        return (
            <nav id="myNav" className="navbar navbar-inverse sticky-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar1">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to="/" className="navbar-left"><img className="navbarLogo" src="./src/imgs/soundWaveLogo.png" /></Link>
                    </div>
                    <div className="collapse navbar-collapse" id="navbar1">
                        <ul className="nav navbar-nav">
                            <li>
                                <Link to="/">
                                    <h4 className="navbarText active">Home</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to="/genres">
                                    <h4 className="navbarText">Genres</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to="/test">
                                    <h4 className="navbarText">Producers</h4>
                                </Link>
                            </li>
                            <li>
                                <Link to="/test">
                                    <h4 className="navbarText">Artists</h4>
                                </Link>
                            </li>
                            
                            
                            
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            {isAuthenticated ? userLinks : guestLinks}
                            
                            <li><Link to="/"><div id="profileIconDiv" className="navbarProfileIcon pulse"></div></Link></li>
                            <li><Link to="/"><div id="gearIconDiv" className="navbarProfileIcon"></div></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

MainNav.propTypes = {
    auth: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps)(MainNav);