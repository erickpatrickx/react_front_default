import React from 'react';
import ReactTable  from 'react-table';
import LoadingSpinner from '../LoadingSpinner';
import 'react-table/react-table.css';

const Clientes = props => {
  
  const clientes = props.clientes;
  if (clientes) {
    return (
      <div>
        <ReactTable
          data={clientes}
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
                    <button className="btn btn-primary btn-sm "  onClick={() => console.log('clicado')}>Edit</button> 
                    <span> </span>
                    
                    <button className="btn btn-danger btn-sm" onClick={() => console.log('clicado')}>Delete</button>
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

export default Clientes;
