import Banner from './Banner';
import React from 'react';
import Clientes from './Clientes';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


@inject('commonStore')
@withRouter
@observer
export default class Home extends React.Component {
  componentDidMount() {
   this.props.commonStore.loadClientes();
  }

  render() {
    const {clientes,token, appName } = this.props.commonStore;
    return (
      <div className="home-page">

    <Banner token={token} appName={appName} />

        <div className="container page">

        <div className="row">    
          <div className="col-md-12">
          <Link to="/cliente">

            <button className="btn btn btn-primary pull-xs-left px-2" type="button"  > Novo </button>
            </Link>
          </div>
         </div> 
          <br></br>
          <div className="row">    
          <div className="col-md-12 ">

          <Clientes
                  clientes={clientes}
                />
               </div> 
          </div>
        </div>

      </div>
    );
  }
}