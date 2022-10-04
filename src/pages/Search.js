import React, { Component } from 'react';
import Header from '../Components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '', loading: false,
      // resultadoP: null,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // search = () => {
  //   const { pesquisa } = this.state;
  //   this.setState({ loading: true });
  //   searchAlbumsAPI(pesquisa).then((a) => {
  //     this.setState({ resultadoP: a });
  //   });
  //   this.setState({ loading: false });
  // };

  // renderPesquisa = () => {
  //   if (resultadoP !== null) {
  //     (
  //       <h1>
  //         Resultado de álbuns de:
  //         {pesquisa}
  //       </h1>);
  //   } else if (resultadoP === []) {
  //     (
  //       <h1>
  //         Nenhum álbum foi encontrado
  //       </h1>);
  //   }
  // };
  // porque o header tbm esta carregando junto com a API?
  // como resolver o problema da segunda renderização condicional?
  // porque a minha função não esta sendo chamada?

  render() {
    const { pesquisa, loading } = this.state;
    return (
      loading ? (
        <>
          <Header />
          <Loading />
        </>
      ) : (
        <div data-testid="page-search">
          <Header />
          <input
            name="pesquisa"
            data-testid="search-artist-input"
            onChange={ this.handleChange }
            value={ pesquisa }
          />
          <button
            disabled={ pesquisa.length < 2 }
            data-testid="search-artist-button"
            type="button"
            onClick={ this.search }
          >
            Pesquisar
          </button>
          {/* {this.renderPesquisa} */}
        </div>)
    );
  }
}
