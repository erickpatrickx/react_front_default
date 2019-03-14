import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { inject, observer } from 'mobx-react';



@inject('commonStore','authStore')
@withRouter
@observer
class Header extends React.Component {

  handleClickLogout = () =>
  this.props.authStore.logout()
    .then(() => this.props.history.replace('/login'));

  render() {
    if(this.props.commonStore.token){
    return (
      
      <nav className="navbar navbar-light">
        <div className="container">

      <Link to="/" className="navbar-brand">
                {this.props.commonStore.appName.toLowerCase()}
              </Link>

       <ul className="nav navbar-nav pull-xs-right">

          <li className="nav-item">
            <Link to="/home" className="nav-link">
            <i className="ion-home" />&nbsp;
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/cliente" className="nav-link">
              <i className="ion-plus" />&nbsp;Novo Cliente
            </Link>
          </li>
          <li className="nav-item">

          <Link  to="/login" className="nav-link" onClick={this.handleClickLogout}>
            <i className="ion-exit" />&nbsp;Logout
          </Link>
          </li>
          </ul>

      </div>

      </nav>
    );
    }else{
      return(
        <nav className="navbar navbar-light">
        <div className="container">
        <Link to="/" className="navbar-brand">
                {this.props.commonStore.appName.toLowerCase()}
              </Link>
        </div>
        </nav>
      );

    }

    
  }
}

export default Header;
