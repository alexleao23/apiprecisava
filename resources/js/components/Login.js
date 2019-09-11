import React, { Component } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: '',
      redirect: false,
      loginError: ''
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeText(event) {
    switch (event.target.id) {
      case 'email':
        this.setState({
          email: event.target.value
        })
        break
      case 'senha':
        this.setState({
          senha: event.target.value
        })
        break
    }
  }

  async handleSubmit() {
    const response = await Axios.post('/api/login', {
      email: this.state.email,
      password: this.state.senha,
    });

    if(response.data.error) {
      this.setState({
        loginError: response.data.error
      });
    } else {
      localStorage.setItem('apitoken', response.data.api_token);
      this.setState({
        redirect: true
      });
    }
  }

  loginFailed() {
    if (this.state.loginError) {
      setTimeout(() => {
        this.setState({
          loginError: ''
        });
      }, 5000);

      return (
        <div className="alert alert-danger" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{this.state.loginError}</span>
          <button type="button" style={{
            borderRadius: '50%',
            border: 'none',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            color: '#761b18',
            fontSize: 11,
            outline: 'none',
            cursor: 'pointer',
            marginTop: 3
          }} onClick={() => this.closeAlert()}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      );
    }

    return null;
  }

  closeAlert() {
    this.setState({
      loginError: ''
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to='/deputados' />
    return (
      <div className="row justify-content-center" style={{ marginTop: '10%' }}>
        <div className="col-lg-3 col-md-6 col-sm-10  align-self-center">
          <div className="card text-center">
            <div className="card-body">
              <img
                src={require('../../../public/img/logo.png')}
                className="img-fluid"
                alt="Logo Precisava?"
                style={{ height: 85, width: 250, paddingBottom: 10 }}
              />
              <h4 className="card-title">Login</h4>

              {this.loginFailed()}

              <form className="text-left">
                <div className="form-group">
                  <label>E-mail</label>
                  <input value={this.state.email} onChange={this.handleChangeText} id="email" type="email" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input value={this.state.senha} onChange={this.handleChangeText} id="senha" type="password" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-6">
                      <Link to="/register" style={{ textDecoration: 'none' }}>Cadastre-se</Link>
                    </div>
                    <div className="col-6 text-right">
                      <Link to="/" style={{ textDecoration: 'none' }}>Página Inicial</Link>
                    </div>
                  </div>
                </div>
                <button onClick={this.handleSubmit} type="button" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }}>
                  Entrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
