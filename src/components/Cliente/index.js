import ListErrors from '../ListErrors';
import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import InputMask from 'react-input-mask';
import MaskedInput from 'react-text-mask'
import queryString from 'query-string';
import ViaCep from 'react-via-cep';

@inject('clienteStore')
@withRouter
@observer
export default class Cliente extends React.Component {

  state = {
    emailInput: '',
    numero: '',
    tipoTelefone:'',
    cep:'',
  };

  componentWillMount() {
    let url = this.props.location.search;
    let params = queryString.parse(url);
    this.props.clienteStore.setId(params["id"]);
  }

  componentDidMount() {
    this.props.clienteStore.loadInitialData();
  
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.clienteStore.loadInitialData();
    }
  }

  changeNome = e => this.props.clienteStore.setNome(e.target.value);
  changeCpf = e => this.props.clienteStore.setCPF(e.target.value);

  changeCep = e => this.props.clienteStore.setCEP(e.target.value);
  changeLogradouro = e => this.props.clienteStore.setLogradouro(e.target.value);
  changeBairro = e => this.props.clienteStore.setBairro(e.target.value);
  changeCidade = e => this.props.clienteStore.setCidade(e.target.value);
  changeUf = e => this.props.clienteStore.setUf(e.target.value);
  changeComplemento = e => this.props.clienteStore.setComplemento(e.target.value);

  changeEmailInput = e => this.setState({ emailInput: e.target.value });

  changeTelefoneNumero = e => this.setState({ numero: e.target.value });
  changeTelefoneTipo = e => {this.setState({ tipoTelefone: e.target.value });
  this.setState({ numero: '' })
}

  handleEmailInputKeyDown = ev => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        this.handleAddEmail();
        break;
      default:
        break;
    }
  };

  handleAddEmail = () => {
    if (this.state.emailInput) {
      const email = {
        email: this.state.emailInput,
      }

      this.props.clienteStore.addEmail(email);
      this.setState({ emailInput: '' });
    }
  };

  handleRemoveEmail = email => {
    if (this.props.clienteStore.inProgress) return;
    this.props.clienteStore.removeEmail(email);
  };


  handleAddTelefone = () => {
    if (this.state.numero && this.state.tipoTelefone) {
      const telefone = {
        numero: this.state.numero,
        tipoTelefone:this.state.tipoTelefone
      }
      this.props.clienteStore.addTelefone(telefone);
      this.setState({ numero: '' });
      this.setState({ tipoTelefone: '' });
    }
  };
  
  
  handleRemoveTelefone = telefone => {
    if (this.props.clienteStore.inProgress) return;
    this.props.clienteStore.removeTelefone(telefone);
  };

 handleSubmitForm = (e) => {
    e.preventDefault();
    const { clienteStore } = this.props;
    clienteStore.submit()
      .then(cliente => {
        clienteStore.reset();
        this.props.history.replace(`/home`)
        //this.props.history.replace(`/article/${article.slug}`)
      });
  };



  render() {
    const {
      inProgress,
      errors,
      nome,
      cpf,
      endereco,
      emailList,
      telefoneList,
    } = this.props.clienteStore;

    return (


      
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">

              <ListErrors errors={errors} />

              <form onSubmit={this.handleSubmitForm}> 
                <fieldset>

                  <fieldset className="form-group">
                    <input required
                      className="form-control"
                      type="text"
                      maxLength="100"
                      placeholder="Nome"
                      value={nome}
                      onChange={this.changeNome}
                      disabled={inProgress}
                    />
                  </fieldset>

                  <fieldset className="form-group">

<                  InputMask placeholder="CPF" required disabled={inProgress} className="form-control col-lg-4"  mask="999.999.999-99" value={cpf} onChange={this.changeCpf}>
                  </InputMask>

                  </fieldset>

                  <fieldset className="form-group ">
                  <InputMask required placeholder="CEP" required disabled={inProgress} className="form-control col-lg-4"  mask="99.999-999"    value={endereco.cep}
                      onChange={this.changeCep}
                      disabled={inProgress}>
                  </InputMask>
                  </fieldset>

                  <fieldset className="form-group">
                    <input required
                      className="form-control"
                      type="text"
                      value={endereco.logradouro}
                      required
                      onChange={this.changeLogradouro}
                      placeholder="Logradouro"
                      disabled={inProgress}
                    />
                                      </fieldset>

                  <fieldset className="form-group">

                      
                    <input  required
                      className="form-control"
                      type="text"
                      value={endereco.bairro}
                      onChange={this.changeBairro}
                      placeholder="Bairro"
                      disabled={inProgress}
                    />  
                  </fieldset>

<                   fieldset className="form-group">

                    <input required
                      className="form-control"
                      type="text"
                      placeholder="Cidade"
                      value={endereco.cidade}
                      required
                      onChange={this.changeCidade}
                      disabled={inProgress}
                    />  
                   </fieldset>

                  <fieldset className="form-group">

                  <select  
                      className="form-control col-lg-3"
                      type="text"
                      placeholder="UF"
                      required
                      value={endereco.uf}
                      onChange={this.changeUf}
                      disabled={inProgress}
                    >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espirito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                    </select>  
                  </fieldset>

                   <fieldset className="form-group">

                <input
                  className="form-control"
                  type="text"
                  placeholder="Complemento"
                  value={endereco.complemento}
                  onChange={this.changeComplemento}
                  disabled={inProgress}
                />  
              </fieldset>


                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Emails"
                      value={this.state.email}
                      onChange={this.changeEmailInput}
                      onBlur={this.handleAddEmail}
                      onKeyDown={this.handleEmailInputKeyDown}
                      disabled={inProgress}
                    />

                    <div className="tag-list">
                      {
                        emailList.map(email => {
                          return (
                            <span className="tag-default tag-pill" key={email.email}>
                              <i
                                className="ion-close-round"
                                onClick={() => this.handleRemoveEmail(email.email)}
                              />
                              {email.email}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>

                  <fieldset className="form-inline">

                  <select className="form-control col-lg-3"     value={this.state.tipoTelefone}   onChange={this.changeTelefoneTipo}>

                      <option value=""  selected>Tipo de telefone</option>
                      <option value="0" >Residêncial</option>
                      <option value="1">Comercial</option>
                      <option value="2">Celular</option>

                      </select>
                      &nbsp;

                  <MaskedInput   placeholder="Telefone"  disabled={inProgress} className="form-control col-lg-6"  
                      mask={this.state.tipoTelefone == 2 ? ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/] :   ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                       value={this.state.numero}
                       onChange={this.changeTelefoneNumero}
                       disabled={inProgress}>
                  </MaskedInput>
                      &nbsp;
                    <button className="btn btn-outline-primary btn-sm col-lg-2 form-control " type="button"  onClick={() => this.handleAddTelefone()}>Adicionar</button> 

                    <div className="tag-list">
                      {

                        
                        telefoneList.map(telefone => {
                          return (
                            <span className="tag-default tag-pill" key={telefone.numero} >
                             <i
                                className="ion-close-round"
                                onClick={() => this.handleRemoveTelefone(telefone)}
                              />
                              {telefone.numero}
                            </span>
                          );
                        })
                      }
                    </div>
                  </fieldset>


                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="submit"
                    disabled={inProgress}
                    onClick={this.submitForm}
                  >
                    Salvar
                  </button>

                </fieldset>
              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
