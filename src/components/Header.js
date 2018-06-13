import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import '../style/header.scss'

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        Header.handleLogOut = Header.handleLogOut.bind(this);
    }

    static handleLogOut(){
        localStorage.setItem("refresh", '');
        this.props.handleLogged(false);
    }

    render() {

        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to='/events' className="nav-link">Event.io</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item"><Link to='/create' className="nav-link" style={{outline: 'none'}}>Create Event</Link></li>
                            <li className="nav-item"><Link to='/events' className="nav-link" style={{outline: 'none'}}>All Events</Link></li>
                            <li className="nav-item dropdown user-options">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {this.props.user.firstName}
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className="dropdown-item" ><Link to='/user' className="nav-link">Profile</Link></li>
                                    <div className="dropdown-divider"/>
                                    <li className="dropdown-item" onClick={Header.handleLogOut}><Link to='/' className="nav-link">Log Out</Link></li>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
