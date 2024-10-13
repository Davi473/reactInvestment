import React from 'react';

interface TableMediaProps <T> {
  valores: T[]; // Recebendo os valores como prop
  rowRenderer?: (item: T) => JSX.Element; // Função para renderizar as linhas
  headerRenderer?: () => JSX.Element; // Função para renderizar o cabeçalho
}

class Table<T> extends React.Component<TableMediaProps<T>> {
  renderHeader = () => {
    const { headerRenderer } = this.props;
    return headerRenderer ? headerRenderer() : (
      <tr>
        <th>#</th>
        <th>Ticket</th>
        <th>Tipo</th>
        <th>Quantidade</th>
        <th>Média</th>
      </tr>
    );
  };

  render() {
    const { valores, rowRenderer } = this.props;

    return (
      <div className="container">
        <table className="table transparent-table">
          <thead>
            {this.renderHeader()}
          </thead>
          <tbody>
            {valores.map(item => 
              rowRenderer ? rowRenderer(item) : (
                <tr key={item.id}>
                  { 
                     Object.keys(item).map(key => (
                        <td key={key}>{item[key]}</td>
                     ))
                  }
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
