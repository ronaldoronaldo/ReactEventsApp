import React, {Component} from 'react'
import '../style/events.scss'
import 'font-awesome/scss/font-awesome.scss'
import { Link, Redirect } from 'react-router-dom'
import Loading from './Loading'
import Event from "./Event";


class Events extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            loading: false,
            displayOption: 'grid'
        };
        this.handleAttend = this.handleAttend.bind(this);
        this.handleUnattend = this.handleUnattend.bind(this);
        this.handleDisplayChange = this.handleDisplayChange.bind(this);
    }

    handleAttend(id, auth) {
        this.setState({
            loading: true
        });
        fetch('https://testproject-api-v2.strv.com/events/' + id + '/attendees/me', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                'Authorization': auth
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

    handleDisplayChange(selectedOption){
        this.setState({
           displayOption: selectedOption
        });
    }

    handleUnattend(id, auth) {
        this.setState({
            loading: true
        });
        fetch('https://testproject-api-v2.strv.com/events/' + id + '/attendees/me', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                'Authorization': auth
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
        let refresh = localStorage.getItem("refresh");
        if (!refresh) {
            return <Redirect to='/'/>
        }
        let cleanListItems = [];
        let chunk = 3;
        let chunkedItems = [];
        let user = this.props.user.id;
        let auth = this.props.auth;
        let loading = null;
        if (this.state.loading){
            loading = <Loading/>
        }
        if(this.state.displayOption === 'grid'){
            let listItems = this.props.events.map(event => {
                return (
                    <Event event={event}
                           auth={this.props.auth}
                           user={this.props.user}
                           callAllEvents={this.props.callAllEvents}
                           setClickedEvent={this.props.setClickedEvent}

                    />
                );

            });
            for (let h = 0; h < listItems.length; h++){
                if (listItems[h]) cleanListItems.push(listItems[h]);
            }
            let j = cleanListItems.length;
            for (let x=0;  x < j; x+=chunk) {
                chunkedItems.push(cleanListItems.slice(x,x+chunk));
            }
            let eventsRow = chunkedItems.map(chunk => {
                if(chunk){
                    return (
                        <div className="row">
                            {chunk}
                        </div>
                    );
                }
            });
            let barsIcon = null;
            if (!this.props.mobileScreen){
                barsIcon = <div className="display-options">
                    <i className="fa fa-th" onClick={this.handleDisplayChange.bind(this, 'grid')}/>
                    <i className="fa fa-bars" onClick={this.handleDisplayChange.bind(this, 'list')}/>
                </div>
            }
            return (
                <div className="container">
                    {barsIcon}
                    <div className="user-events">
                        {eventsRow}
                    </div>
                    {loading}
                </div>
            );
        }

        let listItems = this.props.events.map(event => {
            let unattendButton = false;
            let identifier = event.id;
            for (let i = 0; i < event.attendees.length; i++) {
                if (event.attendees[i].id === user) {
                    unattendButton = true;
                }
            }

            let attendButton = <button type="button"
                                       className="btn btn-success update-event-button"
                                       onClick={this.handleAttend.bind(this, identifier, auth)}>Join</button>;
            if(unattendButton) {
                attendButton = <button type="button"
                                       className="btn btn-danger update-event-button"
                                       onClick={this.handleUnattend.bind(this, identifier, auth)}>Leave</button>;
            }

            return (
                <div className="row event-row">

                        <div className="link-row">
                            <div className="col-md-3 col-sm-6 col-lg-3 event-cell"><Link to={'/event_detail'} style={{ textDecoration: 'none', outline: 'none' }} onClick={this.props.setClickedEvent.bind(this, event.id)}>{event.title}</Link></div>
                            <div className="col-md-2 col-sm-6 col-lg-2 event-cell"><Link to={'/event_detail'} style={{ textDecoration: 'none', outline: 'none' }} onClick={this.props.setClickedEvent.bind(this, event.id)}>{event.description.substring(0, 15)}...</Link></div>
                            <div className="col-md-3 col-sm-6 col-lg-3 event-cell"><Link to={'/event_detail'} style={{ textDecoration: 'none', outline: 'none' }} onClick={this.props.setClickedEvent.bind(this, event.id)}>{event.startsAt}</Link></div>
                            <div className="col-md-1 col-sm-6 col-lg-1 event-cell"><Link to={'/event_detail'} style={{ textDecoration: 'none', outline: 'none' }} onClick={this.props.setClickedEvent.bind(this, event.id)}>{event.owner.firstName}</Link></div>
                            <div className="col-md-2 col-sm-6 col-lg-2 event-cell"><Link to={'/event_detail'} style={{ textDecoration: 'none', outline: 'none' }} onClick={this.props.setClickedEvent.bind(this, event.id)}>{event.attendees.length} / {event.capacity}</Link></div>
                        </div>

                    <div className="col-md-1 col-sm-1 col-lg-6 event-cell-out-of-link">
                        {attendButton}
                    </div>
                </div>
            );
        });
        return (
            <div className="container ">
                <div className="display-options">
                    <i className="fa fa-th" onClick={this.handleDisplayChange.bind(this, 'grid')}/>
                    <i className="fa fa-bars" onClick={this.handleDisplayChange.bind(this, 'list')}/>
                </div>
                <div className="container events-box">
                    {listItems}
                </div>
                {loading}
            </div>
        );
    }
}

export default Events
