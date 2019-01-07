import React, { Component } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      senha: '',
      redirect: false
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeText(event) {
    if (event.target.type == 'email') {
      this.setState({
        email: event.target.value
      })
    } else {
      this.setState({
        senha: event.target.value
      })
    }
  }

  handleSubmit() {
    Axios.post('/api/login', {
      email: this.state.email,
      password: this.state.senha,
    }).then(response => response.data)
    .then(data => {
      localStorage.setItem('apitoken', data.api_token)
      this.setState({
        redirect: true
      })
    })
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
      <div className="row justify-content-center" style={{ marginTop: '10%' }}>
        <div className="col-3  align-self-center">
          <div className="card text-center">
            <div className="card-body">
              <img src={require('../../../public/img/precisava.png')} className="img-fluid" alt="Logo Precisava?" />
              <h4 className="card-title">Login</h4>
              <form className="text-left">
                <div className="form-group">
                  <label>E-mail</label>
                  <input value={this.state.email} onChange={this.handleChangeText} type="email" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input value={this.state.senha} onChange={this.handleChangeText} type="password" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-5">
                      <Link to="/register" style={{ textDecoration: 'none' }}>Cadastre-se</Link>
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
