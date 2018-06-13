import React, {Component} from 'react'
import 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/login.scss'
import { Redirect, Link } from 'react-router-dom'
import swal from 'sweetalert';


class SignUp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {email: '', password: '', first: '', last: '', loading: false, signed: false};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleFirstNameChange(event) {
    this.setState({first: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({last: event.target.value});
  }

  handleSubmit(e) {
    this.setState({
      loading: true
    });
    fetch('https://testproject-api-v2.strv.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'APIKey': '7Sh61BY9wq1eX5FuYCj8vERLcfSGBO9nphbtLcZk6Kzh'
      },
      body: JSON.stringify({
        firstName: this.state.first,
        lastName: this.state.last,
        email: this.state.email,
        password: this.state.password
      })
    }).then(res => {
      res.json().then(
        result => {
          if(result.error){
            console.log('bugou');
            swal("Ops!", "Something went wrong, try again later  ):", "error");
            this.setState({
              loading: false
            });
          }
          else{
            swal("Success!", "Your User was created!", "success");
            this.setState({
              loading: false, signed: true
            });
          }
        });
    })
  }

  render() {
    let refresh = localStorage.getItem("refresh");
    if (refresh || this.state.signed) {
      this.setState({
        signed: false
      });
      return <Redirect to='/events'/>
    }
    if (this.props.mobileScreen){
      return (
        <div>
            <div className="container login-box-mobile">
                <div className="login-form">
                    <h3 className="login-title">Get started absolutely free</h3>
                    <small className="login-label">Enter your details below</small>

                    <form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="firstName"
                                   placeholder="Robert"
                                   value={this.state.first} onChange={this.handleFirstNameChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName"
                                   placeholder="Dawney Jr."
                                   value={this.state.last} onChange={this.handleLastNameChange}/>
                        </div>

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
                        <button type="button" className="btn btn-success login-button" onClick={this.handleSubmit}>Submit</button>
                        <small  className="form-text text-muted sign-link">Already have an account? <Link to={'/'} className="highlight"> LOGIN</Link>
                        </small>
                    </form>
                </div>
                <div className="han-solo">
                    <h3>"Great Kid. Don't get cocky."</h3>
                    <div className="separator"/>
                    <smal>Han Solo</smal>
                </div>
            </div>
        </div>
      );
    }

    return (
      <div>
          <div className="darkback"/>
          <div className="container login-box">
              <div className="login-form">
                  <h3 className="login-title">Get started absolutely free</h3>
                  <small className="login-label">Enter your details below</small>

                  <form>
                      <div className="form-group">
                          <label htmlFor="firstName">First Name</label>
                          <input type="text" className="form-control" id="firstName"
                                 placeholder="Robert"
                                 value={this.state.first} onChange={this.handleFirstNameChange}/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="lastName">Last Name</label>
                          <input type="text" className="form-control" id="lastName"
                                 placeholder="Dawney Jr."
                                 value={this.state.last} onChange={this.handleLastNameChange}/>
                      </div>

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
                      <button type="button" className="btn btn-success login-button" onClick={this.handleSubmit}>Submit</button>
                      <small  className="form-text text-muted sign-link">Already have an account? <Link to={'/'} className="highlight"> LOGIN</Link>
                      </small>
                  </form>
              </div>
              <div className="han-solo">
                  <h3>"Great Kid. Don't get cocky."</h3>
                  <div className="separator"/>
                  <smal>Han Solo</smal>
              </div>
          </div>
      </div>
    );
  }
}

export default SignUp
