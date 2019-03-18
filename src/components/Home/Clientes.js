import React from 'react';
import ReactTable  from 'react-table';
import LoadingSpinner from '../LoadingSpinner';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import 'react-table/react-table.css';



@inject("commonStore")
@observer
export default class Clientes extends React.Component {


  handleRemoveItem = item => {
    this.props.commonStore.removeItem(item);
  };

  render() {

  if (this.props.commonStore.clientes) {
    return (
      <div>
        <ReactTable
          data={this.props.commonStore.clientes}
          columns={[
            {
              Header: "Código",
              columns: [
                {
                  accessor: "cliente.id"
                }
              ]
            },
            {
              Header: "Nome",
              columns: [
                {
                  accessor: "cliente.nome"
                }
              ]
            },
            {
              Header: "CPF",
              columns: [
                {
                  accessor: "cliente.cpf"
                }
              ]
            },
           {
              Cell: row => (

                <div>
                   
                   <Link
                      to={`/cliente/edit/?id=${row.original.cliente.id}`}>
                          <button className="btn btn-primary btn-sm " >Edit</button> 
                    </Link>
        
                    <span> </span>
                    
                    <button className="btn btn-danger btn-sm" onClick={() => {
                      this.props.clienteStore.deleteCliente(row.original.cliente.id);
                     this.handleRemoveItem(row.original)
                    
                    }
                      }>Delete</button>
                </div>
            )

            }
            
          ]}
          defaultSorted={[
            {
              id: "nome",
              desc: true
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        <br />
   
      </div>
    );
  } else {
    return (
      <LoadingSpinner />
    );
  }
};
}
