import React, {Component} from 'react'
import Header from './Header'
import Main from './Main'
import '../style/style.scss'


class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {},
      auth: '',
      events: [],
      selectedEventId: '',
      logged: false,
      mobileScreen: window.innerWidth < 700
    };
    this.setLoggedUser = this.setLoggedUser.bind(this);
    App.callWithRefreshToken = App.callWithRefreshToken.bind(this);
    this.callAllEvents = this.callAllEvents.bind(this);
    this.setUserEvents = this.setUserEvents.bind(this);
    this.setClickedEvent = this.setClickedEvent.bind(this);
    this.handleLogged = this.handleLogged.bind(this);
  }

  setClickedEvent(id){
    this.setState({
      selectedEventId: id
    });
  }

  componentWillMount() {
    let refresh = localStorage.getItem("refresh");
    if (refresh){
      App.callWithRefreshToken(refresh);
      this.callAllEvents();
    }

  }

  setLoggedUser(result, auth) {
    this.setState({
      user: result,
      auth: auth
    });
  }

  setUserEvents(events) {
    this.setState({
      events: events
    });
  }

  static callWithRefreshToken(refresh) {
    fetch('https://testproject-api-v2.strv.com/auth/native', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh'
      },
      body: JSON.stringify({
        refreshToken: refresh
      })
    }).then(res => {
      let auth = res.headers.get('Authorization');
      res.json().then(
        result => {
          if(result.error){
          }
          else {
            this.setLoggedUser(result, auth);
          }
        });
    });
  }

  callAllEvents(){
    fetch('https://testproject-api-v2.strv.com/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh'
      }
    }).then(res => res.json())
      .then(
        (result) => {
          for (let i = 0; i < result.length; i++){
            result[i].startsAt = result[i].startsAt.split("T")[0].split("-").reverse().join(' / ');
          }
          console.log(result);
          this.setState({ events: result });
        });
  }

  handleLogged(value) {
    this.setState({logged: value});
  }

  updateDimensions() {
    if(window.innerWidth < 700) {
      this.setState({ mobileScreen: true });
    }
    else {
      this.setState({ mobileScreen: false });
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    return (
      <div>
          <Header user = {this.state.user}
                  handleLogged={this.handleLogged}
          />
          <Main setLoggedUser = {this.setLoggedUser}
                auth={this.state.auth}
                user={this.state.user}
                events={this.state.events}
                setUserEvents={this.setUserEvents}
                callAllEvents={this.callAllEvents}
                setClickedEvent={this.setClickedEvent}
                selectedEventId={this.state.selectedEventId}
                logged={this.state.logged}
                handleLogged={this.handleLogged}
                mobileScreen={this.state.mobileScreen}
          />
      </div>
    )
  }
}

export default App
