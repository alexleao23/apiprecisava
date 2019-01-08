import Axios from 'axios'
import React, { Component } from 'react'
import Header from './Header'
import Spinner from './Spinner'

class ComentarioRespostas extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comentario: {},
      respostas: [],
      user: {},
      url: `api/deputados/${this.props.match.params.deputadoId}/despesas/${this.props.match.params.despesaId}/comentarios/${this.props.match.params.comentarioId}/respostas`,
      loadMoreDisabled: false,
      unauthorized: false,
      pagination: {},
      textarea: ''
    }
    this.getComentario = this.getComentario.bind(this)
    this.getRespostas = this.getRespostas.bind(this)
    this.getUser = this.getUser.bind(this)
    this.handleChangeText = this.handleChangeText.bind(this)
    this.submitResposta = this.submitResposta.bind(this)
    this.pagination = this.pagination.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount() {
    this.getComentario()
    this.getRespostas()
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

  getComentario() {
    Axios({
      method: 'get',
      url: `api/deputados/${this.props.match.params.deputadoId}/despesas/${this.props.match.params.despesaId}/comentarios/${this.props.match.params.comentarioId}`,
      headers: {
        Authorization: `Bearer ${localStorage.apitoken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(response =>
      this.setState({
        comentario: response.data
      })
    ).catch(() => {
      localStorage.removeItem('apitoken')
      this.setState({
        unauthorized: true
      })
    })
  }

  getRespostas() {
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
        respostas: (this.state.respostas.length > 0) ?
        this.state.respostas.concat(response.data.data)
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
    this.getRespostas()
  }

  handleChangeText(event) {
    this.setState({
      textarea: event.target.value
    })
  }

  submitResposta() {
    this.setState({
      disabled: true
    })
    Axios({
      method: 'post',
      url: `api/deputados/${this.props.match.params.deputadoId}/despesas/${this.props.match.params.despesaId}/comentarios/${this.props.match.params.comentarioId}/resposta`,
      data: {
        'usuario_id': this.state.user.id,
        'comentario_id': this.state.comentario.id,
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
    const comentario = this.state.comentario
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
            <div className="card-header text-center" style={{ padding: '2%' }}>
              <h3 className="text-center">
                Comentário de {comentario.nome_usuario}
              </h3>
              <div className="row justify-content-center text-left">
                {comentario.descricao}
              </div>
            </div>
            <div className="card-body">
              <div className="row justify-content-center">
                <div className="form-group" style={{ width: '70%' }}>
                  <label>Resposta:</label>
                  <textarea onChange={this.handleChangeText} rows="6" className="form-control" placeholder="Seu comentário aqui..."></textarea>
                  <button onClick={this.submitResposta} disabled={this.state.disabled} style={{ marginTop: 5 }} type="button" className="btn btn-primary">
                    Enviar
                  </button>
                </div>
              </div>
              <div className="row justify-content-center">
                <div style={{ width: '70%' }}>
                  <h3 className="text-center" style={{ paddingBottom: '2%' }}>
                    Respostas
                  </h3>
                  <ul className="list-group">
                    {this.state.respostas.map(resposta =>
                      <li className="list-group-item list-group-item-action" key={resposta.id}>
                        <div className="row justify-content-start">
                          <div className="col-12">
                            <strong>
                              {resposta.nome_usuario}
                            </strong>
                          </div>
                        </div>
                        <div className="row justify-content-start">
                          <div className="col-12">
                            {resposta.descricao}
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

export default ComentarioRespostas
