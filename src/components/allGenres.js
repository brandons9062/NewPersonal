import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {getGenres} from '../actions';
import _ from 'lodash';

class AllGenres extends Component {
    componentDidMount(){
        this.props.getGenres();
    }
    
    constructor(props){
        super(props);
        
        this.state = {
            searchTerm: '',
            currentlyDisplayed: this.props.genres
        };
        
        this.onInputChange = this.onInputChange.bind(this);
    }
    
    onInputChange(event) {
        let newlyDisplayed = _.filter(this.props.genres, genre => genre.genrename.toLowerCase().includes(event.target.value.toLowerCase()));
        
        this.setState({
            searchTerm: event.target.value,
            currentlyDisplayed: newlyDisplayed
        });
    }
    
    renderGenres(){
        return _.map(this.state.currentlyDisplayed, genre => {
            return (
                <Link to={`/genres/${genre.id}`} className="col-sm-3 genreName listItemDiv grow" key={genre.id}>
                    <div className="list-group-item individualListItem">
                        <h6 className="genreName">{genre.genrename}</h6>
                    </div>
                </Link> 
            );
        })
    }
    
    render() {
        return (
            <div className="container-fluid">
                <div className="row pageTitleDiv">
                    <h3 className="pageTitle">Choose a Genre</h3>
                    <input type="text" value={this.state.searchTerm} onChange={this.onInputChange} className="searchBox" />
                </div>
                <div className="row pageListUlDiv">
                    <ul className="list-group pageUl">
                        {this.renderGenres()}
                    </ul>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {genres: state.genres};
}

export default connect(mapStateToProps, {getGenres})(AllGenres);