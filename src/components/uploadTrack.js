import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';

class UploadTrack extends Component {
    
    renderField(field){
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type={field.type}
                    {...field.input}
                />
            </div>
        );
    }
    
    
    render(){
        return (
            <form>
                <Field
                    name="title"
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
                    name="genre"
                    label="Genre"
                    type="text"
                    component={this.renderField}
                 />
                <Field
                    name="genre"
                    label="Genre"
                    type="text"
                    component={this.renderField}
                 />
            </form>
        );
    }
}

export default reduxForm({
    form: 'UploadTrackForm'
})(UploadTrack);