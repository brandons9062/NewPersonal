import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {createTrack, getGenres} from '../actions';
import {connect} from 'react-redux';

class UploadTrack extends Component {
    componentDidMount(){
        this.props.getGenres();
    }
    
    renderField(field){
        const {meta : {touched, error}} = field;
        
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }
    
    onSubmit(values){
        values.tracklength = 0;
        values.genreId = 1;
        values.creatorId = 1;
        _.map(this.props.genres, genre => {
            if(values.genreName == genre.genrename){
                values.genreId = genre.id;
            }
        })

        if(values.fileType == 'mp3'){
            values.mp3 = values.trackFile;
            values.wav = null;
        } else if(values.fileType == 'wav'){
            values.wav = values.trackFile;
            values.mp3 = null;
        } else {
            values.mp3 = null;
            values.wav = null;
        }
        console.log(values);
        this.props.createTrack(values, () => {
            this.props.history.push('/');
        })
    }
    
    
    render(){
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    name="trackName"
                    label="Track Title"
                    type="text"
                    component={this.renderField}
                 />
                <Field
                    name="price"
                    label="Price"
                    type="number"
                    component={this.renderField}
                 />
                <Field
                    name="genreName"
                    label="Genre"
                    type="text"
                    component={this.renderField}
                 />
                <Field
                    name="fileType"
                    label="File Type"
                    type="text"
                    component={this.renderField}
                 />
                <Field
                    name="trackFile"
                    label="Choose Track to Upload"
                    type="file"
                    component={this.renderField}
                 />
                <Field
                    name="trackFileUrl"
                    label="Track File URL"
                    type="hidden"
                    component={this.renderField}
                 />
                <Field
                    name="img"
                    label="Track Art (Optional)"
                    type="file"
                    component={this.renderField}
                 />
                <img id="trackImgPreview" src="./src/imgs/djIconGray.png" />
                <Field
                    id="trackImgUrl"
                    name="imgFileUrl"
                    label="Image File URL"
                    type="hidden"
                    component={this.renderField}
                    value="./src/imgs/djIconGray.png"
                 />
                
                <button type='submit' className="btn btn-primary">Upload</button>
                <Link to='/' className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};
    
    if(!values.trackName){
        errors.trackName = "Please enter a Track Name";
    }
    if(!values.price){
        errors.price = "Please give your track a price. If you want your track to be free, then enter '0' or '0.00'.";
    }
    if(!values.genreName){
        errors.genreName = "Please select the genre that most closely fits your track";
    }
    if(!values.fileType){
        errors.fileType = "Please select which file type you are uploading.";
    }
    if(!values.trackFile){
        errors.trackFile = "Select a track to upload."
    }
    
    return errors;
}

function mapStateToProps(state){
    return {genres: state.genres};
}


export default reduxForm({
    form: 'UploadTrackForm',
    validate
})(connect(mapStateToProps, {createTrack, getGenres})(UploadTrack));