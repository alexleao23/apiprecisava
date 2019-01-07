import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import Header from './Header'

class Ranking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      reacoes: [],
      ranking: []
    }
    this.getReacoes = this.getReacoes.bind(this)
  }

  componentDidMount() {
    this.getReacoes()
  }

  getReacoes() {
    Axios({
      method: 'get',
      url: `/api/reacoes`,
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
      this.setState({
        'ranking': response.data,
        isLoading: false
      })
    ).catch(error => console.log(error))
  }

  rankingPositivo() {
    let lista = []
    this.state.ranking.sort((a, b) =>
      b.reacoes_positivas - a.reacoes_positivas
    ).forEach((deputado, index) => {
      if (index < 3) {
        lista .push(
          <Link key={index} to={`/deputado-${deputado.deputado_id}-despesas`} style={{ textDecoration: 'none' }}>
            <li className="list-group-item">
              <h6>
                <strong>
                  {index+1}º {deputado.nome_deputado}
                </strong>
              </h6>
              <img className="rounded" src={require(`../../../public/img/deputados/${deputado.deputado_id}.jpg`)} alt={deputado.nome_eleitoral} style={{ width: 110, height: 150 }} />
              <div className="row justify-content-center" style={{ marginTop: 5 }}>
                <div className="col-md-12">
                  <button disabled type="button" className="btn btn-primary btn-lg">{deputado.reacoes_positivas} Likes</button>
                </div>
              </div>
            </li>
          </Link>
        )
      }
    });
    return lista
  }

  rankingNegativo() {
    let lista = []
    this.state.ranking.sort((a, b) =>
      b.reacoes_negativas - a.reacoes_negativas
    ).forEach((deputado, index) => {
      if (index < 3) {
        lista .push(
          <Link key={index} to={`/deputado-${deputado.deputado_id}-despesas`} style={{ textDecoration: 'none' }}>
            <li className="list-group-item">
              <h6>
                <strong>
                  {index+1}º {deputado.nome_deputado}
                </strong>
              </h6>
              <img className="rounded" src={require(`../../../public/img/deputados/${deputado.deputado_id}.jpg`)} alt={deputado.nome_eleitoral} style={{ width: 110, height: 150 }} />
              <div className="row justify-content-center" style={{ marginTop: 5 }}>
                <div className="col-md-12">
                  <button disabled type="button" className="btn btn-danger btn-lg">{deputado.reacoes_negativas} Deslikes</button>
                </div>
              </div>
            </li>
          </Link>
        )
      }
    });
    return lista
  }

  render() {
    if(this.state.isLoading){
      return (
        <div>
          <Header/>
          <div className="card" style={{ marginTop: '6%' }}>
            <div className="card-body text-center">
              <Spinner width={100} height={100} />
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Header/>
        <div className="card" style={{ marginTop: '6%', marginBottom: '2%' }}>
          <div className="card-body text-center">
            <div className="row justify-content-around">
              <div className="col-md-3">
                <h3 style={{ paddingBottom: 5 }}>
                  Ranking Positivo
                </h3>
                <ul className="list-group">
                  {this.rankingPositivo()}
                </ul>
              </div>
              <div className="col-md-3">
                <h3 style={{ paddingBottom: 5 }}>
                  Ranking Negativo
                </h3>
                <ul className="list-group">
                  {this.rankingNegativo()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Ranking
