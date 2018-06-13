import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import Events from './Events'
import User from './User'
import Create from './Create'
import EventDetail from './EventDetail'
import SignUp from "./SignUp";

class Main extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render(){
        return (
            <main>
                <Switch>
                    <Route exact path='/' render={()=><Login setLoggedUser = {this.props.setLoggedUser}
                                                             handleLogged={this.props.handleLogged}
                                                             logged={this.props.logged}
                                                             callAllEvents={this.props.callAllEvents}
                                                             mobileScreen={this.props.mobileScreen}
                    />}/>
                    <Route path='/sign' render={()=><SignUp  mobileScreen={this.props.mobileScreen}
                    
                    />}/>
                    <Route path='/create' render={()=><Create auth = {this.props.auth}
                                                              callAllEvents={this.props.callAllEvents}
                                                              mobileScreen={this.props.mobileScreen}

                    />}/>
                    <Route path='/user' render={()=><User user = {this.props.user}
                                                          auth = {this.props.auth}
                                                          events={this.props.events}
                                                          setUserEvents={this.props.setUserEvents}
                                                          callAllEvents={this.props.callAllEvents}
                                                          setClickedEvent={this.props.setClickedEvent}
                                                          mobileScreen={this.props.mobileScreen}
                    />}/>
                    <Route path='/events' render={()=><Events user = {this.props.user}
                                                              auth = {this.props.auth}
                                                              events={this.props.events}
                                                              setUserEvents={this.props.setUserEvents}
                                                              callAllEvents={this.props.callAllEvents}
                                                              setClickedEvent={this.props.setClickedEvent}
                                                              mobileScreen={this.props.mobileScreen}

                    />}/>
                    <Route path='/event_detail' render={()=><EventDetail user = {this.props.user}
                                                                         auth = {this.props.auth}
                                                                         events={this.props.events}
                                                                         callAllEvents={this.props.callAllEvents}
                                                                         selectedEventId={this.props.selectedEventId}
                                                                         mobileScreen={this.props.mobileScreen}
                    />}/>
                </Switch>
            </main>
        )
    }
}

export default Main
