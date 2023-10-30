import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      faves: [],
      loading: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const faveSongs = await getFavoriteSongs();
    this.setState({ faves: faveSongs, loading: false });
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const data = await getMusics(id);
    const dataFiltrada = data.filter((_element, index) => index > 0);
    this.setState({ musicas: dataFiltrada });
  }

  // func = async (trackId) => {
  //   const faves = await getFavoriteSongs();
  //   const isFavorite = await faves.some((element) => element.trackId === (trackId));
  //   // const isFavorite = faves.some((element) => console.log(element.trackId === (trackId), element.trackId, trackId));
  //   // console.log(isFavorite);
  //   return isFavorite;
  //   // ? this.setState({ checkBox: true })
  //   // : this.setState({ checkBox: false });
  // };

  handleFaves = async ({ target }) => {
    const { musicas } = this.state;
    const musicId = target.id;
    const obj = musicas.filter((element) => element.trackId === Number(musicId));
    const objeto = obj[0];
    console.log(objeto);
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(objeto);
      this.setState((prev) => ({
        faves: [...prev.faves, objeto], loading: false,
      }));
    } else console.log('removeu');
  };

  render() {
    const { musicas, loading, faves } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {musicas[0]?.artistName}
        </p>
        <p data-testid="album-name">{musicas[0]?.collectionName}</p>
        {loading ? <Loading /> : (
          <div>
            { musicas
              .map(
                (element) => (
                  (<MusicCard
                    checkBox={ faves
                      .some((elemento) => elemento.trackId === (element.trackId)) }
                    handleFaves={ this.handleFaves }
                    trackName={ element.trackName }
                    previewUrl={ element.previewUrl }
                    key={ element.trackId }
                    trackId={ element.trackId }
                  />)
                ),
              )}
          </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
