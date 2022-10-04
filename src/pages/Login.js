import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      campoLogin: '',
      loading: false,
    };
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async () => {
    const { campoLogin } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: campoLogin });
    // this.setState({ loading: false });
    history.push('search');
  };

  render() {
    const tres = 3;
    const { campoLogin, loading } = this.state;
    // renderCondicional = () => { loading ? (<Loading />) : (form); };
    return (
      loading ? (<Loading />) : (
        <div data-testid="page-login">
          <input
            value={ campoLogin }
            name="campoLogin"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            name="loginButton"
            type="button"
            disabled={ campoLogin.length < tres }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </div>)
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
