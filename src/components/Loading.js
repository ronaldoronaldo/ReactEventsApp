import React, { Component } from 'react';
import '../style/loading.scss'

class Loading extends Component {
    render() {
        return (
            <div className="loading">
                <i className="fa fa-refresh fa-spin"/>
            </div>
        );
    }
}


export default Loading
