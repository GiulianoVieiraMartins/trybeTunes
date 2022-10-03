import React, { Component } from 'react';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      campoLogin: '',
    };
  }

  // verifica = () => {
  //   this.state.campoLogin.length > 3;
  // };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const tres = 3;
    const { campoLogin } = this.state;
    return (
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
          onClick={ createUser({ name: campoLogin }) }
          // pq o teste não passa a função sendo chamda e onde que essa variavel esta sendo guardada?
        >
          Entrar

        </button>
      </div>
    );
  }
}
