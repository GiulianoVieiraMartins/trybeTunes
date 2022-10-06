import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class MusicCard extends Component {
  render() {
    const { previewUrl, trackName, trackId, handleFaves } = this.props;
    return (
      <>
        <label htmlFor={ trackId }>
          Favorita
          <input
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
};
