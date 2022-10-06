import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checkBox: false,
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const faves = await getFavoriteSongs();
    // console.log(favoritas);
    const verifica = faves.some((element) => element.trackId === trackId);
    if (verifica) {
      this.setState({ checkBox: true });
    }
  }

  // func = ({ target }) => {
  //   console.log('queijo');
  //   // target.checked === true ? this.setState({ checkBox: false }) : this.setState({ checkBox: true })
  //   if (target.checked === true) {
  //     this.setState({ checkBox: false });
  //   }
  //   this.setState({ checkBox: true });
  // };

  render() {
    const { checkBox } = this.state;
    const { previewUrl, trackName, trackId, handleFaves } = this.props;
    return (
      <>
        <label htmlFor={ trackId }>
          Favorita
          <input
            checked={ checkBox }
            // onClick={ this.func }
            onChange={ handleFaves }
            data-testid={ `checkbox-music-${trackId}` }
            id={ trackId }
            type="checkbox"
          />
        </label>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  handleFaves: PropTypes.func.isRequired,
  // favoritas: PropTypes.shape().isRequired,
};
