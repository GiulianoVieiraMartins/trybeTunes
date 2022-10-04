import React, { Component } from 'react';
import Header from '../components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      loading: false,
      // resultadoP: [],
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
  //   const { pesquisa, resultadoP } = this.state;
  //   if (resultadoP.length === 0) {
  //     return (
  //       <h1>
  //         Nenhum álbum foi encontrado
  //       </h1>);
  //   } (
  //     <h1>
  //       Resultado de álbuns de:
  //       {pesquisa}
  //     </h1>);
  // };

  render() {
    const { pesquisa,
      // resultadoP,
      loading } = this.state;
    return (
      <>
        <Header />
        {loading ? (
          <Loading />
        ) : (
          <div data-testid="page-search">

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
            {/* {!loading && resultadoP.map((element) => <p>{JSON.stringify(element)}</p>)} */}
          </div>)}

      </>
    );
  }
}
