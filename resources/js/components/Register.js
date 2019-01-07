import React, { Component } from 'react'
import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: '',
      dataNasc: '',
      email: '',
      senha: '',
      senhaConfirmar: '',
      registered: false
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeText(event) {
    switch (event.target.id) {
      case 'nome':
        this.setState({
          nome: event.target.value
        })
        break;
      case 'dataNasc':
        this.setState({
          dataNasc: event.target.value
        })
        break;
      case 'email':
        this.setState({
          email: event.target.value
        })
        break;

      case 'password':
        this.setState({
          senha: event.target.value
        })
        break;
      default:
        this.setState({
          senhaConfirmar: event.target.value
        })
        break;
    }
  }

  handleSubmit() {
    Axios.post('/api/register', {
      nome: this.state.nome,
      data_nasc: this.state.dataNasc.split('/').reverse().join('-'),
      email: this.state.email,
      password: this.state.senha,
      password_confirmation: this.state.senhaConfirmar
    }).then(response => response.data)
    .then(() =>
      this.setState({
        registered: true
      })
    )
  }

  render() {
    if(this.state.registered) return <Redirect to='/login' />
    return (
      <div className="row justify-content-center" style={{ marginTop: '1%' }}>
        <div className="col-lg-5 col-md-8 col-sm-10  align-self-center">
          <div className="card text-center">
            <div className="card-body">
              <img src={require('../../../public/img/precisava.png')} className="img-fluid" alt="Logo Precisava?" />
              <h4 className="card-title">Cadastro</h4>
              <form className="text-left">
                <div className="form-group">
                  <label>Nome</label>
                  <input value={this.state.nome} type="text" onChange={this.handleChangeText} id="nome" className="form-control" placeholder="Ex: João Pereira da Silva" />
                </div>
                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input value={this.state.dataNasc} onChange={this.handleChangeText} id="dataNasc" className="form-control" placeholder="Ex: 01/01/2000" />
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input value={this.state.email} type="email" onChange={this.handleChangeText} id="email" className="form-control" placeholder="Ex: exemplo@mail.com" />
                </div>
                <div className="form-group">
                  <label>Senha</label>
                  <input value={this.state.senha} type="password" onChange={this.handleChangeText} id="password" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <label>Confirmar Senha</label>
                  <input value={this.state.senhaConfirmar} type="password" onChange={this.handleChangeText} id="passwordConfirmation" className="form-control" placeholder="" />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-7">
                      <Link to="/login" style={{ textDecoration: 'none' }}>Já é cadastrado?</Link>
                    </div>
                  </div>
                </div>
                <button onClick={this.handleSubmit} type="button" className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: '#4267b2', borderColor: '#4267b2' }}>Concluir</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register
