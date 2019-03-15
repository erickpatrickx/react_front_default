import { observable, action } from 'mobx';
import agent from '../agent';
import commonStore from './commonStore';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    username: '',
    password: '',
  };


  @action setUserName(username) {
    this.values.username = username;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.username, this.values.password)
      .then(({ user  }) => commonStore.setToken(user.token))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  

  @action logout() {
    commonStore.setToken(undefined);
    return Promise.resolve();
  }
}

export default new AuthStore();
