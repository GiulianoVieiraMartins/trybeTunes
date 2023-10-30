import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     checkBox: false,
  //   };
  // }

  // async componentDidMount() {
  //   await this.func();
  // }

  // func = async () => {
  //   const { trackId } = this.props;
  //   const faves = await getFavoriteSongs();
  //   return faves.some((element) => element.trackId === (trackId))
  //     ? this.setState({ checkBox: true })
  //     : this.setState({ checkBox: false });
  // };

  render() {
    // const { checkBox } = this.state;
    const { previewUrl, trackName, trackId, handleFaves, checkBox } = this.props;
    // console.log(checkBox());
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
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.number,
  handleFaves: PropTypes.func,
  checkBox: PropTypes.bool,
  // favoritas: PropTypes.shape().isRequired,
}.isRequired;
