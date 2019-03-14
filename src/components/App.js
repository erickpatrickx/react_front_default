import Header from './Header';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Login from './Login';
import Home from './Home';
import Cliente from './Cliente';
import PrivateRoute from './PrivateRoute';


@inject('commonStore')
@withRouter
@observer
export default class App extends React.Component {

  componentWillMount() {
    if (!this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.token) {
      this.props.commonStore.setAppLoaded();
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <div>
          <Header />
          <Switch>
            <PrivateRoute path="/home" component={Home} />
            <Route path="/cliente" component={Cliente} />

            <Route path="/login" component={Login} />
            <Route path="/" component={Login} />

          </Switch>
        </div>
      );
    }
    return (
      <Header />
    );
  }
}
