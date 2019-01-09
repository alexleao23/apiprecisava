import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class HomePage extends Component {
  render() {
    return (
      <div>
        <nav
          className='navbar navbar-expand-lg navbar-light navbar-laravel'
          style={{ borderRadius: '5px' }}
        >
          <div className='container-fluid'>
            <Link className='navbar-brand' to='/'>
              <img
                src={require('../../../public/img/logo.png')}
                className="img-fluid"
                alt="Logo Precisava?"
                style={{ height: 45, width: 150 }}
              />
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: 'flex-end' }}>
              <div className="navbar-nav text-right" style={{ fontSize: '20px' }}>
                <Link exact className="nav-item nav-link" to="/login">Login </Link>
                <Link exact className="nav-item nav-link" to="/register">Cadastro </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="card" style={{ marginTop: '1%' }}>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-sm-10 col-md-10 col-lg-7">
                <h3 className="card-title text-center">Instruções de uso do sistema</h3>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/PGRVUJImuwM" allowFullScreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
