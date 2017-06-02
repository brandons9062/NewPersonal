import React, {Component} from 'react';
import {Link} from 'react-router-dom'; 
import Auth from '../auth/auth';

class MainNav extends Component {
    render() {
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
                            <li>
                                <Link to="/test">
                                    <h4 className="navbarText">Login</h4>
                                </Link>
                            </li>
                            <li>
                                <button className="btn btn-primary" onClick={Auth.login()}>
                                    <h4 className="navbarText">Login</h4>
                                </button>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="/"><div id="profileIconDiv" className="navbarProfileIcon pulse"></div></Link></li>
                            <li><Link to="/"><div id="gearIconDiv" className="navbarProfileIcon"></div></Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default MainNav;