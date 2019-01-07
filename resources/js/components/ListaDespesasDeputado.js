import Axios from 'axios'
import React, { Component } from 'react'
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

class ListaDespesasDeputado extends Component {
  constructor(props) {
    super(props)
    this.state = {
      despesas: [],
      deputado: {},
      user: {},
      url: `/api/deputados/${this.props.match.params.deputadoId}/despesas?page=1`,
      pagination: {},
      isLoading: true,
      rerenderButtons: false,
      loadMoreDisabled: false
    }
    this.getDespesas = this.getDespesas.bind(this)
    this.getDeputado = this.getDeputado.bind(this)
    this.getUser = this.getUser.bind(this)
    this.pagination = this.pagination.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.renderButtons = this.renderButtons.bind(this)
  }

  componentDidMount() {
    this.getDeputado()
    this.getDespesas()
    this.getUser()
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

  getDespesas() {
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
        despesas: (this.state.despesas.length > 0) ? this.state.despesas.concat(response.data.data):response.data.data,
        url: response.data.links.next,
        isLoading: false,
        rerenderButtons: true
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

  getDeputado() {
    Axios({
      method: 'get',
      url: `/api/deputados/${this.props.match.params.deputadoId}`,
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({
        deputado: response.data,
      })
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
    this.getDespesas()
  }

  getIdade(dataNasc) {
    let hoje = new Date()
    let nasc = new Date(dataNasc)
    let idade = hoje.getFullYear() - nasc.getFullYear()
    let mes = hoje.getMonth() - nasc.getMonth()
    if (mes < 0 || (mes === 0 && hoje.getDate() < nasc.getDate())) {
        idade--;
    }
    return idade;
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

  handleReacao(despesaId, value) {
    Axios({
      method: 'post',
      url: `/api/deputados/${this.props.match.params.deputadoId}/despesas/${despesaId}/reacao`,
      data: {
        usuario_id: this.state.user.id,
        despesa_id: despesaId,
        reacao: value
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

  renderButtons(despesa) {
    if(despesa.reacao_usuario != null && despesa.reacao_usuario.reacao == 1) {
      return (
        <div>
          <button disabled style={{ margin: 2 }} type="button" className='btn btn-primary'>
            Like
          </button>
          <button disabled style={{ margin: 2 }} type="button" className='btn btn-outline-danger'>
            Deslike
          </button>
          <Link style={{ margin: 2 }} className="btn btn-outline-secondary" to={`/deputado-${this.state.deputado.id}-despesa-${despesa.id}-comentarios`}>
            Comentar
          </Link>
        </div>
      )
    } else if(despesa.reacao_usuario != null && despesa.reacao_usuario.reacao == 0) {
      return (
        <div>
          <button disabled style={{ margin: 2 }} type="button" className='btn btn-outline-primary'>
            Like
          </button>
          <button disabled style={{ margin: 2 }} type="button" className='btn btn-danger'>
            Deslike
          </button>
          <Link style={{ margin: 2 }} className="btn btn-outline-secondary" to={`/deputado-${this.state.deputado.id}-despesa-${despesa.id}-comentarios`}>
            Comentar
          </Link>
        </div>
      )
    } else {
      return (
        <div>
          <button onClick={()=>this.handleReacao(despesa.id, 1)} style={{ margin: 2 }} type="button" className='btn btn-outline-primary'>
            Like
          </button>
          <button onClick={()=>this.handleReacao(despesa.id, 0)} style={{ margin: 2 }} type="button" className='btn btn-outline-danger'>
            Deslike
          </button>
          <Link style={{ margin: 2 }} className="btn btn-outline-secondary" to={`/deputado-${this.state.deputado.id}-despesa-${despesa.id}-comentarios`}>
            Comentar
          </Link>
        </div>
      )
    }
  }

  render() {
    const deputado = this.state.deputado
    if(this.state.isLoading){
      return (
        <div>
          <Header />
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
        <Header />
          <div className="card" style={{ marginTop: '1%', marginBottom: '2%' }}>
            <div className="card-header" style={{ padding: '2%' }}>
              <div className="row justify-content-center">
                <img className="rounded float-left" src={require(`../../../public/img/deputados/${deputado.id}.jpg`)} alt={deputado.nome_eleitoral} style={{ width: 140, height: 190 }} />
                <div className="table-responsive-md" style={{ paddingLeft: '2%' }}>
                  <table className="table-borderless">
                    <tbody>
                      <tr>
                        <td><strong>Nome Eleitoral: </strong>{deputado.nome_eleitoral}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong>Nome Civil: </strong>{deputado.nome_civil}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong>Condição Eleitoral: </strong>{deputado.condicao_eleitoral}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong>UF Eleito: </strong>{deputado.uf_eleito}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong>Data de Nascimento: </strong>{deputado.data_nasc.split('-').reverse().join('/')}</td>
                        <td><strong>Idade: </strong>{this.getIdade(deputado.data_nasc)}</td>
                      </tr>
                      <tr>
                        <td><strong>Escolaridade: </strong>{deputado.escolaridade}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong>Partido: </strong>{deputado.sigla_partido}</td>
                        <td></td>
                      </tr>
                      <tr>
                        <td><strong>Município de Nascimento: </strong>{deputado.municipio_nasc}</td>
                        <td><strong>UF de Nascimento: </strong>{deputado.uf_nasc}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div style={{ width: '70%' }}>
                  <h3 className="text-center" style={{ paddingBottom: '2%' }}>Lista de Despesas</h3>
                  <ul className="list-group">
                    {this.state.despesas.map((despesa, index) => (
                      <li className="list-group-item list-group-item-action" key={despesa.id}>
                        <div className="table-responsive-md" style={{ paddingLeft: '2%', paddingTop: 2 }}>
                          <table className="table-borderless">
                            <tbody>
                              <tr>
                                <td rowSpan="6" style={{ width: 50 }}>
                                  <strong>
                                    {index+1}ª
                                  </strong>
                                </td>
                                <td><strong>Descrição: </strong>{despesa.descricao}</td>
                              </tr>
                              <tr>
                                <td><strong>Valor: </strong>R$ {numeroParaMoeda(despesa.valor_documento, 2, ',', '.')}</td>
                              </tr>
                              <tr>
                                <td><strong>Fornecedor: </strong>{despesa.fornecedor}</td>
                              </tr>
                              <tr>
                                <td><strong>CPF/CNPJ Fornecedor: </strong>{this.converterCpfCnpj(despesa.cpfcnpj_fornecedor)}</td>
                              </tr>
                              <tr>
                                <td><strong>Data de Emissão: </strong>{this.converterData(despesa)}</td>
                              </tr>
                              <tr>
                                <td>
                                  {this.renderButtons(despesa)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </li>
                    ))}
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

export default ListaDespesasDeputado
