import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  async componentDidMount() {
    const { id } = this.props.match.params;
    const data = await getMusics(id);
    console.log(data);
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <div data-testid="page-album">
        <Header />
        Album e
        { id }
      </div>
    );
  }
}
// validation
