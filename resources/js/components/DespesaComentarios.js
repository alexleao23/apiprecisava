import Axios from 'axios'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Header from './Header'
import Spinner from './Spinner'

function numeroParaMoeda(n, c, d, t) {
  let s = 0
  let i = 0
  let j = 0
  c = isNaN(c = Math.abs(c)) ? 2 : c, d = d == undefined ? "," : d, t = t == undefined ? "." : t, s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
class DespesaComentarios extends Component {
  constructor(props) {
    super(props)
    this.state = {
      despesa: {},
      comentarios: [],
      user: {},
      textarea: '',
      url: `api/deputados/${this.props.match.params.deputadoId}/despesas/${this.props.match.params.despesaId}/comentarios`,
      isLoading: true,
      disabled: false,
      pagination: {},
      loadMoreDisabled: false
    }
    this.getDespesa = this.getDespesa.bind(this)
    this.getComentarios = this.getComentarios.bind(this)
    this.getUser = this.getUser.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.submitComentario = this.submitComentario.bind(this)
    this.pagination = this.pagination.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  converterData(data) {
    if(data.data_emissao) {
      return data.data_emissao.split('-').reverse().join('/')
    } else if(data.mes_documento > 9) {
      return data.mes_documento + "/" + data.ano_documento
    } else {
      return "0" + data.mes_documento + "/" + data.ano_documento
    }
  }

  converterCpfCnpj(cpfCnpj) {
    if (cpfCnpj > 11) {
      return cpfCnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5")
    } else if (cpfCnpj == 11) {
      return cpfCnpj.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4")
    } else {
      return cpfCnpj
    }
  }

  componentDidMount() {
    this.getDespesa()
    this.getComentarios()
    this.getUser()
  }

  getDespesa() {
    Axios({
      method: 'get',
      url: `api/deputados/${this.props.match.params.deputadoId}/despesas/${this.props.match.params.despesaId}`,
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({
        despesa: response.data,
      })
    }).catch(error => {
      console.log(error)
    })
  }

  getComentarios() {
    Axios({
      method: 'get',
      url: this.state.url,
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({
        comentarios: (this.state.comentarios.length > 0) ?
        this.state.comentarios.concat(response.data.data)
        : response.data.data,
        isLoading: false
      })
      this.pagination(response.data)
      if(this.state.pagination.paginaAtual == this.state.pagination.ultimaPagina) {
        this.setState({
          loadMoreDisabled: true
        })
      }
    }).catch(error => {
      console.log(error)
    })
  }

  pagination(data) {
    let pagination = {
      paginaAtual: data.meta.current_page,
      ultimaPagina: data.meta.last_page,
      nextUrl: data.links.next,
      prevUrl: data.links.prev,
    }
    this.setState({pagination})
  }

  loadMore() {
      this.setState({
        url: this.state.pagination.nextUrl
      })
      this.getComentarios()
  }

  getUser() {
    Axios({
      method: 'get',
      url: 'api/user',
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({
        user: response.data
      })
    }).catch(error => {
      console.log(error)
    })
  }

  handleChangeText(event) {
    this.setState({
      textarea: event.target.value
    })
  }

  submitComentario() {
    this.setState({
      disabled: true
    })
    Axios({
      method: 'post',
      url: `api/deputados/${this.props.match.params.deputadoId}/despesas/${this.props.match.params.despesaId}/comentario`,
      data: {
        'usuario_id': this.state.user.id,
        'despesa_id': this.state.despesa.id,
        'descricao': this.state.textarea
      },
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
      response.data
    ).catch(error => {
      console.log(error)
    })
    window.location.reload()
  }

  render() {
    const despesa = this.state.despesa
    if(this.state.isLoading){
      return (
        <div>
          <Header />
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
        <Header />
          <div className="card" style={{ marginTop: '6%', marginBottom: '2%' }}>
            <div className="card-header text-center" style={{ padding: '2%' }}>
              <h3 className="text-center">
                Despesa de {despesa.nome_deputado}
              </h3>
              <div className="row justify-content-center text-left">
                <div className="table-responsive-md">
                  <table className="table-borderless">
                    <tbody>
                      <tr>
                        <td>
                          <strong>Descrição: </strong>
                          {despesa.descricao}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Valor: </strong>
                          R$ {numeroParaMoeda(despesa.valor_documento)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Fornecedor: </strong>
                          {despesa.fornecedor}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>CPF/CNPJ Fornecedor: </strong>
                          {this.converterCpfCnpj(despesa.cpfcnpj_fornecedor)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Data de Emissão: </strong>
                          {this.converterData(despesa)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="form-group" style={{ width: '70%' }}>
                  <label>Comentário:</label>
                  <textarea onChange={this.handleChangeText} rows="6" className="form-control" placeholder="Seu comentário aqui..."></textarea>
                  <button onClick={this.submitComentario} disabled={this.state.disabled} style={{ marginTop: 5 }} type="button" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </div>
              <div className="row justify-content-center">
                <div style={{ width: '70%' }}>
                  <h3 className="text-center" style={{ paddingBottom: '2%' }}>
                    Comentários
                  </h3>
                  <ul className="list-group">
                    {this.state.comentarios.map(comentario =>
                      <li className="list-group-item list-group-item-action" key={comentario.id}>
                        <div className="row justify-content-start">
                          <div className="col-12">
                            <strong>
                              {comentario.usuario.nome}
                            </strong>
                          </div>
                        </div>
                        <div className="row justify-content-start">
                          <div className="col-12">
                            {comentario.descricao}
                          </div>
                        </div>
                        <div className="row justify-content-start">
                          <div className="col-12">
                            <Link to={`/deputado-${despesa.deputado_id}-despesa-${despesa.id}-comentario-${comentario.id}-respostas`} className="btn btn-outline-secondary btn-sm">
                              Responder
                            </Link>
                          </div>
                        </div>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="row justify-content-center" style={{ paddingTop: '2%' }}>
                <button disabled={this.state.loadMoreDisabled} className="btn btn-primary" onClick={this.loadMore}>Load More</button>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default DespesaComentarios
