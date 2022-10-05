import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      retornoAPI: [],
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const data = await getMusics(id);
    this.setState({ retornoAPI: data });
    // console.log(this.state.retornoAPI[0].artistName);
  }

  render() {
    const { retornoAPI } = this.state;
    // const { match } = this.props;
    // const { id } = match.params;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">
          {retornoAPI[0]?.artistName}
        </p>
        <p data-testid="album-name">{retornoAPI[0]?.collectionName}</p>
        { retornoAPI.filter((el, _i, arr) => el !== arr[0])
          .map((element, index) => (<MusicCard
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            key={ index }
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
