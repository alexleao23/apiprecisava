import Axios from 'axios'
import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deslogado: false
    }
    this.logout = this.logout.bind(this)
  }

  logout(event) {
    event.preventDefault()
    Axios({
      method: 'post',
      url: `/api/logout`,
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      localStorage.removeItem('apitoken')
      this.setState({
        deslogado: true
      })
    }).catch(error => {
      console.log(error)
    })
  }

  render() {
    if(this.state.deslogado){
      return <Redirect to="/login" />
    }
    return (
      <nav
        className='navbar fixed-top navbar-expand-lg navbar-light navbar-laravel'
        style={{
          borderRadius: '5px'
        }}
      >
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>
            <img
              src={require('../../../public/img/logo.png')}
              className="img-fluid"
              alt="Logo Precisava?"
              style={{
                height: 45,
                width: 150
              }}
            />
          </NavLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
            <div className="navbar-nav text-right" style={{ fontSize: '20px' }}>
              <NavLink exact className="nav-item nav-link" to="/">Deputados </NavLink>
              <NavLink exact className="nav-item nav-link" to="/ranking">Ranking </NavLink>
              <a onClick={this.logout} href="#" className="nav-item nav-link">Sair </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header
