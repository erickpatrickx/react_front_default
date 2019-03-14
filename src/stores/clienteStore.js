import { observable, action } from 'mobx';
import agent from '../agent';

class ClienteStore {

  @observable inProgress = false;
  @observable errors = undefined;
  @observable id = undefined;

  @observable nome = '';
  @observable cpf = '';

  @observable endereco = {
      cep:'',
      logradouro:'',
      bairro:'',
      cidade:'',
      uf:'',
      complemento:''
  };

  @observable emailList = [];

  @observable telefoneList = [];



  @action setId(id) {
    if (this.id !== id) {
      this.reset();
      this.id = id;
    }
  }
  /**

  @action loadInitialData() {
    if (!this.id) return Promise.resolve();
    this.inProgress = true;
    return articlesStore.loadArticle(this.articleSlug, { acceptCached: true })
      .then(action((article) => {
        if (!article) throw new Error('Can\'t load original article');
        this.title = article.title;
        this.description = article.description;
        this.body = article.body;
        this.tagList = article.tagList;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }
 */

  @action reset() {
    this.nome = '';
    this.cpf = '';
    this.endereco.cep='';
    this.endereco.logradouro='',
    this.endereco.bairro='',
    this.endereco.cidade='',
    this.endereco.uf='',
    this.endereco.complemento=''
    this.emailList = [];
    this.telefoneList = [];

  }

  @action setNome(nome) {
    this.nome = nome;
  }

  @action setCPF(cpf) {
    this.cpf = cpf;
  }

  @action setCEP(cep) {
    this.endereco.cep = cep;
  }
  @action setLogradouro(logradouro) {
    this.endereco.logradouro = logradouro;
  }
  @action setBairro(bairro) {
    this.endereco.bairro = bairro;
  }
  @action setCidade(cidade) {
    this.endereco.cidade = cidade;
  }

  @action setUf(uf) {
    this.endereco.uf = uf;
  }

  @action setComplemento(complemento) {
    this.endereco.complemento = complemento;
  }

  @action addEmail(email) {
    if (this.emailList.includes(email)) return;
    this.emailList.push(email);
  }

  @action removeEmail(email) {
    this.emailList = this.emailList.filter(t => t.email !== email);
  }

  @action addTelefone(telefone) {
    if (this.telefoneList.includes(telefone)) return;
    this.telefoneList.push(telefone);
  }

  @action removeTelefone(telefone) {
    this.telefoneList = this.telefoneList.filter(t => t.numero !== telefone.numero);
  }



  @action submit() {
    this.inProgress = true;
    this.errors = undefined;
    const cliente = {
        nome: this.nome,
        cpf: this.cpf,
        endereco: {
        cep:this.endereco.cep,
        logradouro:this.endereco.logradouro,
        bairro:this.endereco.bairro,
        cidade:this.endereco.cidade,
        uf: this.endereco.uf,
        complemento:this.endereco.complemento,
      },
      emails:this.emailList,
      telefones:this.telefoneList
      //slug: this.articleSlug,
    };
    return (this.id ? this.updateCliente(cliente) : this.createCliente(cliente))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors; throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }


  @action createCliente(cliente) {
    return agent.Clientes.create(cliente)
      .then(({ cliente }) => { return cliente;})
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
  }

  @action updateCliente(data) {
    return agent.Clientes.update(data)
    .then(({ cliente }) => { return cliente;})
    .catch(action((err) => {
      this.errors = err.response && err.response.body && err.response.body.errors;
      throw err;
    }))
  }

  @action deleteCliente(id) {
    this.articlesRegistry.delete(id);
    return agent.Clientes.del(id)
      .catch(action(err => { this.loadArticles(); throw err; }));
  }

  
}


export default new ClienteStore();
