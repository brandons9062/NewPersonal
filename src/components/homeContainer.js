import React, {Component} from 'react';
import {Link} from 'react-router-dom';


class Home extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div id="homeColumnRow" className="row">
                    <div className="col-sm-4 homeColumn">
                        <Link to="/tracks" className="grow">
                            <div id="homeSearchIcon" className="homeColumnImage"></div>
                            <h3 className="homeColumnText">Find a Track</h3>
                        </Link>
                    </div>
                    <div className="col-sm-4 homeColumn">
                        <Link to="/test" className="grow">
                            <div id="homeCollaborationIcon" className="homeColumnImage"></div>
                            <h3 className="homeColumnText">Start a Collaboration</h3>
                        </Link>
                    </div>
                    <div className="col-sm-4 homeColumn">
                        <Link to="/tracks/new" className="grow">
                            <div id="homeUploadTrackIcon" className="homeColumnImage"></div>
                            <h3 className="homeColumnText">Upload a Track</h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;