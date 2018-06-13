import React, {Component} from 'react'
import '../style/user.scss'
import { Link } from 'react-router-dom'
import Loading from "./Loading";



class Event extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = { event: {}, loading: false};
        this.handleAttend = this.handleAttend.bind(this);
        this.handleUnattend = this.handleUnattend.bind(this);
    }

    componentWillMount() {
        this.setState({
            event: this.props.event
        });
    }

    handleAttend(id) {
        this.setState({
            loading: true
        });
        fetch('https://testproject-api-v2.strv.com/events/' + id + '/attendees/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                'Authorization': this.props.auth
            }
        }).then(res => res)
            .then(
                (result) => {
                    if(result.status === 200){
                        this.props.callAllEvents();
                        this.setState({
                            loading: false
                        });
                    }
                    else{
                        console.log('update error');
                        this.setState({
                            loading: false
                        });
                    }

                });
    }

    handleUnattend(id) {
        this.setState({
            loading: true
        });
        fetch('https://testproject-api-v2.strv.com/events/' + id + '/attendees/me', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                'Authorization': this.props.auth
            }
        }).then(res => res)
            .then(
                (result) => {
                    if(result.status === 200){
                        this.props.callAllEvents();
                        this.setState({
                            loading: false
                        });
                    }
                    else{
                        console.log('update error');
                        this.setState({
                            loading: false
                        });
                    }

                });
    }

    render() {
        let event = this.props.event;
        let loading = null;
        if (this.state.loading){
            loading = <Loading/>
        }
        console.log(this.props.event);
        let unattendButton = false;
        let identifier = event.id;
        for (let i = 0; i < event.attendees.length; i++) {
            if (event.attendees[i].id === this.props.user.id) {
                unattendButton = true;
            }
        }
        let eventButton = <button type="button"
                                  className="btn btn-success leave-event-button"
                                  onClick={this.handleAttend.bind(this, identifier)}>Join</button>;
        if(unattendButton) {
            eventButton = <button type="button"
                                  className="btn btn-danger leave-event-button"
                                  onClick={this.handleUnattend.bind(this, identifier)}>Leave</button>;
        }
        return (
            <div className="col-md-4 col-sm-12">
                {loading}
                    <div className="event-box">
                        <Link to={'/event_detail'}
                              style={{
                                  textDecoration: 'none',
                                  outline: 'none',
                                  width: 'auto'
                              }}
                              onClick={this.props.setClickedEvent.bind(this, event.id)}>
                        <h4 className="user-event-title">{event.title}</h4>
                        <small className="owner-label">{this.props.event.owner.firstName} {this.props.event.owner.lastName}</small>
                        <p className="user-event-description">{event.description}</p>
                        </Link>
                        <div className="event-options">
                            <p><i className="fa fa-user"/> {event.attendees.length} / {event.capacity}</p>
                            {eventButton}
                        </div>
                    </div>
            </div>
        );
    }
}

export default Event
