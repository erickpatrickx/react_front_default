import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const LoggedOutView = props => {
  if (!props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Login
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/cliente" className="nav-link">
            Cliente
          </Link>
        </li>

      </ul>
    );
  }
  return null;
};

const LoggedInView = props => {
  if (props.currentUser) {
    return (
      <ul className="nav navbar-nav pull-xs-right">

        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/editor" className="nav-link">
            <i className="ion-compose" />&nbsp;New Post
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <i className="ion-gear-a" />&nbsp;Settings
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/@${props.currentUser.username}`}
            className="nav-link"
          >
            <img src={props.currentUser.image} className="user-pic" alt="" />
            {props.currentUser.username}
          </Link>
        </li>

      </ul>
    );
  }

  return null;
};

@inject('userStore', 'commonStore')
@observer
class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">

          <Link to="/" className="navbar-brand">
            {this.props.commonStore.appName.toLowerCase()}
          </Link>

          <LoggedOutView currentUser={this.props.userStore.currentUser} />

          <LoggedInView currentUser={this.props.userStore.currentUser} />
        </div>
      </nav>
    );
  }
}

export default Header;
