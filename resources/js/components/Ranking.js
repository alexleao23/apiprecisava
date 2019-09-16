import Axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'
import Header from './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

class Ranking extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      reacoes: [],
      ranking: [],
      unauthorized: false
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
    ).catch(() => {
      localStorage.removeItem('apitoken')
      this.setState({
        unauthorized: true
      })
      window.location.reload()
    })
  }

  rankingPositivo() {
    let lista = []
    this.state.ranking.sort((a, b) =>
      b.reacoes_positivas - a.reacoes_positivas
    ).forEach((deputado, index) => {
      // if (index < 3) {
        lista .push(
          <Link key={index} to={`/deputado-${deputado.deputado_id}-despesas`} style={{ textDecoration: 'none', marginLeft: 5, marginRight: 5, marginBottom: 5, marginTop: 5, maxWidth: 250 }}>
            <li className="list-group-item">
              <h6>
                <strong>
                  {index+1}º {deputado.nome_deputado}
                </strong>
              </h6>
              <div className="row justify-content-center" style={{ marginTop: 5 }}>
                <div className="col-md-12">
                  <img src={deputado.deputado_image} className="rounded" style={{ width: 110, height: 150 }} />
                  <button
                    disabled type="button"
                    className="btn btn-success btn-lg"
                    style={{ padding: 30, marginLeft: 5 }}
                  >
                    <div className="row justify-content-center">
                      {deputado.reacoes_positivas}
                    </div>
                    <div className="row justify-content-center">
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        pull="right"
                        size="lg"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </li>
          </Link>
        )
      }
    // }
    );
    return lista
  }

  rankingNegativo() {
    let lista = []
    this.state.ranking.sort((a, b) =>
      b.reacoes_negativas - a.reacoes_negativas
    ).forEach((deputado, index) => {
      // if (index < 3) {
        lista .push(
          <Link key={index} to={`/deputado-${deputado.deputado_id}-despesas`} style={{ textDecoration: 'none', marginLeft: 5, marginRight: 5, marginBottom: 5, marginTop: 5, maxWidth: 250 }}>
            <li className="list-group-item">
              <h6>
                <strong>
                  {index+1}º {deputado.nome_deputado}
                </strong>
              </h6>
              <div className="row justify-content-center" style={{ marginTop: 5 }}>
                <div className="col-md-12">
                  <img
                    src={deputado.deputado_image}
                    className="rounded"
                    alt={deputado.nome_eleitoral}
                    style={{ width: 110, height: 150 }}
                  />
                  <button
                    disabled type="button"
                    className="btn btn-danger btn-lg"
                    style={{ padding: 30, marginLeft: 5 }}
                  >
                    <div className="row justify-content-center">
                      {deputado.reacoes_negativas}
                    </div>
                    <div className="row justify-content-center">
                      <FontAwesomeIcon
                        icon={faThumbsDown}
                        pull="right"
                        size="lg"
                      />
                    </div>
                  </button>
                </div>
              </div>
            </li>
          </Link>
        )
      }
    // }
    );
    return lista
  }

  rankingDespesas() {
    let lista = []
    this.state.ranking.sort((a, b) =>
      b.qtd_despesas - a.qtd_despesas
    ).forEach((deputado, index) => {
      // if (index < 3) {
        lista.push(
          <Link key={index} to={`/deputado-${deputado.deputado_id}-despesas`} style={{ textDecoration: 'none', marginLeft: 5, marginRight: 5, marginBottom: 5, marginTop: 5, maxWidth: 250 }}>
            <li className="list-group-item">
              <h6>
                <strong>
                  {index + 1}º {deputado.nome_deputado}
                </strong>
              </h6>
              <div className="row justify-content-center" style={{ marginTop: 5 }}>
                <div className="col-md-12">
                  <img
                    src={deputado.deputado_image}
                    className="rounded"
                    alt={deputado.nome_eleitoral}
                    style={{ width: 110, height: 150, marginBottom: 10 }}
                  />
                </div>
                <h4>
                  {deputado.qtd_despesas} Despesas
                </h4>
              </div>
            </li>
          </Link>
        )
      }
    // }
    );
    return lista
  }

  render() {
    if(this.state.isLoading){
      return (
        <div>
          <Header/>
          <div className="card" style={{ marginTop: '1%' }}>
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
        <div className="card" style={{ marginTop: '1%', marginBottom: '2%' }}>
          <div className="card-body text-center">
            <h3 style={{ paddingBottom: 5 }}>
              Ranking de Despesas
            </h3>
            <div className="row justify-content-around">
              <div className="col-md-12">
                <ul className="list-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {this.rankingDespesas()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: '1%', marginBottom: '2%' }}>
          <div className="card-body text-center">
            <h3 style={{ paddingBottom: 5 }}>
              Ranking de Aprovação do Público
            </h3>
            <div className="row justify-content-around">
              <div className="col-md-12">
                <ul className="list-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {this.rankingPositivo()}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="card" style={{ marginTop: '1%', marginBottom: '2%' }}>
          <div className="card-body text-center">
            <h3 style={{ paddingBottom: 5 }}>
              Ranking de Desaprovação do Público
            </h3>
            <div className="row justify-content-around">
              <div className="col-md-12">
                <ul className="list-group" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
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
