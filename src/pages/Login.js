import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        <input testid="login-name-input" />
        <button type="button">Entrar</button>
      </div>
    );
  }
}
