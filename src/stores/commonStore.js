import { observable, action, reaction } from 'mobx';
import agent from '../agent';

class CommonStore {

  @observable appName = 'CRUD Clientes';
  @observable token = window.localStorage.getItem('jwt');
  @observable appLoaded = false;

  @observable clientes = [];
  @observable isLoadingClientes = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          sessionStorage.setItem('jwt', token);
        } else {
          sessionStorage.removeItem('jwt');
        }
      }
    );
  }

  @action loadClientes() {
    this.isLoadingClientes = true;
    return agent.Clientes.getAll()
    .then(action((response) => { this.clientes = response }))    
    .finally(action(() => { this.isLoadingClientes = false; }))
    
  }

  @action setToken(token) {
    sessionStorage.setItem('jwt', token);
    this.token = token;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

  @action setClientes(clientes) {
    this.clientes = clientes;
  }
  @action removeItem(item) {
    this.clientes = this.clientes.filter(t => t.id !== item.id);
  }


}




export default new CommonStore();