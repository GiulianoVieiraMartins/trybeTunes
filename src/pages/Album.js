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
      loading: false,
      favoritas: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const data = await getMusics(id);
    this.setState({ musicas: data });
    const faves = await getFavoriteSongs();
    this.setState({ favoritas: faves, loading: false });
  }

  handleFaves = async ({ target }) => {
    this.setState({ loading: true });
    const obj = await getMusics(target.id);
    await addSong(obj[0]);
    const faves = await getFavoriteSongs();
    this.setState({ favoritas: faves, loading: false });
  };

  render() {
    const { musicas, loading, favoritas } = this.state;
    // const { match } = this.props;
    // const { id } = match.params;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {musicas[0]?.artistName}
        </p>
        <p data-testid="album-name">{musicas[0]?.collectionName}</p>
        { musicas.filter((el, _i, arr) => el !== arr[0])
          .map((element, index) => (<MusicCard
            favoritas={ favoritas }
            handleFaves={ this.handleFaves }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            key={ index }
            trackId={ element.trackId }
          />))}
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
