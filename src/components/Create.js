import React, {Component} from 'react'
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import '../style/create.scss'
import { Redirect } from 'react-router-dom'
import swal from 'sweetalert';
import { browserHistory } from 'react-router'

let today = new Date();
let lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);


class Create extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {title: '', description: '', date: null, capacity: 0, created: false};
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleCapacityChange = this.handleCapacityChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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


    handleSubmit(e) {
        fetch('https://testproject-api-v2.strv.com/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh',
                'Authorization': this.props.auth
            },
            body: JSON.stringify({
                title: this.state.title,
                description: this.state.description,
                startsAt: this.state.date,
                capacity: this.state.capacity
            })
        }).then(res => res.json())
            .then(
                (result) => {
                    if(result.error){
                        console.log('error na criacao', result.error);
                        swal("Ops!", "Something went wrong, try again later  ):", "error");
                    }
                    else{
                        swal("Success!", "Your Event was created.", "success").then((value) => {
                            this.setState({created: true});
                            this.props.callAllEvents();
                        })

                    }

                });
    }

    render() {
        let refresh = localStorage.getItem("refresh");
        if (!refresh || this.state.created) {
            this.setState({created: false});
            return <Redirect to='/'/>
        }
        return (
            <div className="container-fluid">
                <div className="create-box">
                    <div className="form-group row">
                        <div className="box-left col-md-6 col-sm-12">

                            <h3>Create new Event</h3>
                            <small>Enter details below</small>
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
                                    className="btn btn-success create-event-button"
                                    onClick={this.handleSubmit}>Create</button>
                        </div>
                        <div className="calendar col-md-6 sol-sm-12">
                            <InfiniteCalendar
                                width={300}
                                height={300}
                                selected={null}
                                disabledDays={[0,6]}
                                minDate={today}
                                onSelect={(date) => {
                                    this.handleDateChange(date)
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Create
