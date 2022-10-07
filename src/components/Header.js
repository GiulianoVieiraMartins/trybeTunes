import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
// import Loading from './Loading';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true, nomeLogin: '',
    };
  }

  async componentDidMount() {
    const a = await getUser();
    this.setState({
      nomeLogin: a.name,
      loading: false,
    });
  }

  render() {
    const { nomeLogin, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div data-testid="header-user-name">{loading ? <Loading /> : nomeLogin}</div>
        <nav>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
        {/* <nav>
          <a data-testid="link-to-search" href="/search">Search</a>
          <a data-testid="link-to-favorites" href="/favorites">Favorites</a>
          <a data-testid="link-to-profile" href="/profile">Profile</a>
        </nav> */}
      </header>
    );
  }
}
