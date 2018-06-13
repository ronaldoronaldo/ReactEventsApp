import React, {Component} from 'react'
import 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/login.scss'
import { Redirect, Link } from 'react-router-dom'
import Loading from "./Loading";
import swal from 'sweetalert';


class Login extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {email: '', password: '', loading: false};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(e) {
    this.setState({
      loading: true
    });
    fetch('https://testproject-api-v2.strv.com/auth/native', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(res => {
      let auth = res.headers.get('Authorization');
      let refreshToken = res.headers.get('Refresh-Token');
      res.json().then(
        result => {
          if(result.error){
            this.setState({
              loading: false
            });
            swal("Ops!", "Something went wrong, try again later  ):", "error");

          }
          else{
            this.props.setLoggedUser(result, auth);
            this.props.handleLogged.bind(this, true);
            localStorage.setItem("refresh", refreshToken);
            this.setState({
              loading: false
            });
            this.props.callAllEvents();
          }

        });

    })

  }

  render() {
    let refresh = localStorage.getItem("refresh");
    let loading = null;
    if (refresh || this.props.logged) {
      return <Redirect to='/events'/>
    }
    if (this.state.loading){
      loading = <Loading/>
    }

    if (window.innerWidth < 700){
      return (
        <div>
            <div className="container login-box-mobile">
                <div className="login-form">
                    <h3 className="login-title">Sign in to Eventio</h3>
                    <small className="login-label">Enter your details below</small>

                    <form>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="tony@stark.com"
                                   value={this.state.email} onChange={this.handleEmailChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"
                                   placeholder="theGreatestAvenger"
                                   value={this.state.password} onChange={this.handlePasswordChange}/>
                        </div>
                        <button type="button" className="btn btn-success login-button" onClick={this.handleSubmit}>Login</button>
                        <small className="sign-link">Don't have an account yet? <Link to={'/sign'} className="highlight"> SIGN UP</Link></small>
                    </form>
                </div>
            </div>
          {loading}
        </div>
      );
    }
    return (
      <div>
          <div className="darkback"/>
          <div className="container login-box">
              <div className="login-form">
                  <h3 className="login-title">Sign in to Eventio</h3>
                  <small className="login-label">Enter your details below</small>

                  <form>
                      <div className="form-group">
                          <label htmlFor="exampleInputEmail1">Email address</label>
                          <input type="email" className="form-control" id="exampleInputEmail1"
                                 aria-describedby="emailHelp" placeholder="tony@stark.com"
                                 value={this.state.email} onChange={this.handleEmailChange}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="exampleInputPassword1">Password</label>
                          <input type="password" className="form-control" id="exampleInputPassword1"
                                 placeholder="theGreatestAvenger"
                                 value={this.state.password} onChange={this.handlePasswordChange}/>
                      </div>
                      <button type="button" className="btn btn-success login-button" onClick={this.handleSubmit}>Login</button>
                      <small className="sign-link">Don't have an account yet? <Link to={'/sign'} className="highlight"> SIGN UP</Link></small>
                  </form>
              </div>

              <div className="han-solo">
                  <h3>“ Great Kid. Don't get cocky. ”</h3>
                  <div className="separator"/>
                  <div className="separator-middle"/>
                  <div className="separator"/>
                  <smal>Han Solo</smal>
              </div>

          </div>
        {loading}
      </div>
    );
  }
}

export default Login
