import React, {Component} from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import '../style/event.scss'
import swal from 'sweetalert';
import { Redirect } from 'react-router-dom'
import Loading from "./Loading";

let today = new Date();

class EventDetail extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            event: {},
            attendees: [],
            owner: {},
            description: '',
            date: null,
            capacity: 0,
            title: '',
            eventDeleted: false,
            loading: false
        };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAttend = this.handleAttend.bind(this);
        this.handleUnattend = this.handleUnattend.bind(this);
        this.callEventId = this.callEventId.bind(this);
    }

    componentWillMount() {
        this.callEventId();
    }

    callEventId(){
        this.setState({
            loading: true
        });
        let id = this.props.selectedEventId;
        let url = 'https://testproject-api-v2.strv.com/events/' + id;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh'
            }
        }).then(res => res.json())
            .then(
                (result) => {
                    if (result.error){
                        console.log('error');
                        this.setState({
                            loading: false
                        });
                    }
                    else{
                        let date = result.startsAt;
                        result.startsAt = result.startsAt.split("T")[0].split("-").reverse().join(' / ');
                        this.setState({
                            event: result,
                            attendees: result.attendees,
                            owner: result.owner,
                            title: result.title,
                            description: result.description,
                            date: date,
                            capacity: result.capacity,
                            loading: false
                        });
                    }
                });
    }

    handleSubmit() {
        let id = this.props.selectedEventId;
        let auth = this.props.auth;
        this.setState({
            loading: true
        });
        fetch('https://testproject-api-v2.strv.com/events/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                'Authorization': auth
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                startsAt: this.state.date,
                capacity: this.state.capacity
            })
        }).then(res => res)
            .then(
                (result) => {
                    if(result.status === 200){
                        this.setState({
                            loading: false
                        });
                        swal("Success!", "Your Event was created.", "success").then((value) => {
                            this.callEventId();
                        })
                    }
                    else{
                        console.log('update error');
                        this.setState({
                            loading: false
                        });
                    }

                });
    }

    handleAttend() {
        let id = this.props.selectedEventId;
        let auth = this.props.auth;
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
                        this.callEventId();
                        this.setState({
                            loading: false
                        });
                    }
                    else{
                        console.log('error', result.error);
                        this.setState({
                            loading: false
                        });
                        swal("Ops!", "Something went wrong, try again later  ):", "error");

                    }

                });
    }

    handleUnattend() {
        let id = this.props.selectedEventId;
        let auth = this.props.auth;
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
                        this.callEventId();
                        this.setState({
                            loading: false
                        });
                    }
                    else{
                        this.setState({
                            loading: false
                        });
                        swal("Ops!", "Something went wrong, try again later  ):", "error");
                    }

                });
    }

    handleDelete() {
        let id = this.props.selectedEventId;
        let auth = this.props.auth;

        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover!",
            icon: "warning",
            buttons: true,
            dangerMode: true
        }).then((value) => {
            if (value){
                this.setState({
                    loading: true
                });
                fetch('https://testproject-api-v2.strv.com/events/' + id, {
                    method: 'Delete',
                    headers: {
                        'Content-Type': 'application/json',
                        'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                        'Authorization': auth
                    }
                }).then(res => res)
                    .then(
                        (result) => {
                            if(result.status === 204){
                                this.setState({
                                    eventDeleted: true,
                                    loading: false
                                });
                                this.props.callAllEvents();
                            }
                            else{
                                console.log('error', result.error);
                                this.setState({
                                    loading: false
                                });
                                swal("Ops!", "Something went wrong, try again later  ):", "error");
                            }
                        });
            }
        });

    }

    handleTitleChange(event) {
        this.setState({title: event.target.value});
    }

    handleDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    handleDateChange(date) {
        this.setState({date: date});
    }

    handleCapacityChange(event) {
        this.setState({capacity: event.target.value});
    }

    render() {
        if(this.state.eventDeleted){
            this.setState({
                eventDeleted: false
            });
            return <Redirect to='/events'/>
        }
        let user = this.props.user.id;
        let attendees = this.state.attendees;
        let owner = this.state.owner;
        let event = this.state.event;
        let loading = null;
        if (this.state.loading){
            loading = <Loading/>
        }
        let listItems = attendees.map(attendee => {
            return (
                <div>
                    <h4>{attendee.firstName}</h4>
                </div>
            );
        });
        let unattendButton = false;
        for (let i = 0; i < attendees.length; i++) {
            if (attendees[i].id === user) {
                unattendButton = true;
            }
        }
        let attendButton = <button type="button"
                                   className="btn btn-success update-event-button"
                                   onClick={this.handleAttend}>Join</button>;
        if(unattendButton){
            attendButton = <button type="button"
                                   className="btn btn-danger update-event-button"
                                   onClick={this.handleUnattend}>Leave</button>
        }
        if (user && event.owner && user === owner.id){
            return (
                <div className="event-container">
                    <div className="row">
                        <div className="col-md-6 col-sm-12 info-box">
                            <div className="form-group">
                                <label htmlFor="eventTitle">Title</label>
                                <input type="text"
                                       className="form-control"
                                       id="eventTitle"
                                       placeholder="Enter the event title"
                                       value={this.state.title}
                                       onChange={this.handleTitleChange}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="eventCapacity">Capacity</label>
                                <input type="number"
                                       className="form-control"
                                       id="eventCapacity"
                                       placeholder="Enter event capacity"
                                       value={this.state.capacity}
                                       onChange={this.handleCapacityChange}/>
                            </div>
                            <label htmlFor="exampleFormControlTextarea1">Description</label>
                            <textarea className="form-control"
                                      id="exampleFormControlTextarea1"
                                      rows="3"
                                      value={this.state.description}
                                      onChange={this.handleDescriptionChange}/>
                            <button type="button"
                                    className="btn btn-primary update-event-button"
                                    onClick={this.handleSubmit}>Update</button>
                            <button type="button"
                                    className="btn btn-danger delete-event-button"
                                    onClick={this.handleDelete}>Delete</button>
                            <div className="attendees-box">
                                <h4 className="attendees-title"> Attendees:</h4>
                                {listItems}
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <InfiniteCalendar
                                width={300}
                                height={300}
                                selected={this.state.date}
                                disabledDays={[0,6]}
                                minDate={today}
                                onSelect={(date) => {
                                    this.handleDateChange(date)
                                }}
                            />
                        </div>
                        {loading}
                    </div>
                </div>
            );
        }
        return (
            <div className="event-container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 info-box">
                        <h1>{event.title}</h1>
                        <p>{event.description}</p>
                        <p><i className="fa fa-user"/> {attendees.length} / {event.capacity}</p>
                        {attendButton}
                        <div className="attendees-box">
                            <h4 className="attendees-title"> Attendees:</h4>
                            {listItems}
                        </div>
                    </div>

                    <div className="col-md-5 col-sm-12">
                        <InfiniteCalendar
                            width={300}
                            height={300}
                            selected={this.state.date}
                            disabledDays={[0,6]}
                            minDate={today}
                            onSelect={(date) => {
                                this.handleDateChange(date)
                            }}
                        />
                    </div>
                    {loading}
                </div>
            </div>
        );
    }
}

export default EventDetail
