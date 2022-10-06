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
      retornoAPI: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const data = await getMusics(id);
    this.setState({ retornoAPI: data });
    // console.log(this.state.retornoAPI[0].artistName);
  }

  handleFaves = async ({ target }) => {
    this.setState({ loading: true });
    // console.log(target.id);
    const obj = await getMusics(target.id);
    await addSong(obj[0]);
    console.log(obj);
    // this.setState((prev) => ({ favoritas: [...prev.favoritas, data] }));
    await getFavoriteSongs();
    // console.log(music);
    this.setState({ loading: false });
  };

  render() {
    const { retornoAPI, loading } = this.state;
    // const { match } = this.props;
    // const { id } = match.params;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {retornoAPI[0]?.artistName}
        </p>
        <p data-testid="album-name">{retornoAPI[0]?.collectionName}</p>
        { retornoAPI.filter((el, _i, arr) => el !== arr[0])
          .map((element, index) => (<MusicCard
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
