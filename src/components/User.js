import React, {Component} from 'react'
import '../style/user.scss'
import 'font-awesome/scss/font-awesome.scss'
import { Link, Redirect } from 'react-router-dom'
import Event from './Event'



class User extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        let refresh = localStorage.getItem("refresh");
        let cleanListItems = [];
        let chunk = 3;
        let chunkedItems = [];
        let firstLetter = '';
        let lastLetter = '';

        if (!refresh) {
            return <Redirect to='/'/>
        }
        let listItems = this.props.events.map(event => {
            for (let i = 0; i < event.attendees.length; i++) {
                if (event.attendees[i].id === this.props.user.id) {
                    return (
                        <Event event={event}
                               auth={this.props.auth}
                               user={this.props.user}
                               callAllEvents={this.props.callAllEvents}
                               setClickedEvent={this.props.setClickedEvent}

                        />
                    );
                }
            }
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
        if (this.props.user.firstName){
            firstLetter = this.props.user.firstName[0];
            lastLetter = this.props.user.lastName[0];
        }
        return (
            <div className="container">
                <div className="user-box">
                    <div className="img-box">
                        <div className="user-img">
                            <h2 className="user-letters">{firstLetter} {lastLetter}</h2>
                        </div>
                    </div>
                    <div className="user-titles">
                        <h4>{this.props.user.firstName} {this.props.user.lastName}</h4>
                        <p>{this.props.user.email}</p>
                    </div>
                </div>
                <div className="user-events">
                    {eventsRow}
                </div>
            </div>
        );
    }
}

export default User
