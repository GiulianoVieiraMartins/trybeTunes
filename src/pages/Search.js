import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      pesquisa: '',
      loading: false,
      resultadoP: [],
      resultadoVazio: false,
      artista: '',
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  search = () => {
    const { pesquisa, resultadoP } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(pesquisa).then((a) => {
      // console.log(a);
      this.setState({ artista: pesquisa, resultadoP: a, loading: false, pesquisa: '' });
    });
    if (resultadoP.length === 0) {
      this.setState({ resultadoVazio: true });
    }
  };

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
      resultadoP, artista, resultadoVazio,
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
              value={ pesquisa }
            >
              Pesquisar
            </button>
            {!loading
            && resultadoP.length === 0
            && resultadoVazio && <p>Nenhum álbum foi encontrado</p>}
            {!loading
            && resultadoP.length > 0
            && (
              <>
                <p>
                  {`Resultado de álbuns de: ${artista}`}
                </p>
                {resultadoP.map((element, i) => (
                  <Link
                    data-testid={ `link-to-album-${element.collectionId}` }
                    to={ `/album/${element.collectionId}` }
                    key={ i + element.collectionId }
                  >
                    <p key={ i }>{JSON.stringify(element)}</p>
                  </Link>
                ))}

              </>)}
          </div>)}
      </>
    );
  }
}
