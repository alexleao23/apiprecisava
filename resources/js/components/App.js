import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import NotFound from './NotFound'
import Register from './Register'
import Login from './Login'
import Home from './Home'
import HomePage from './HomePage'
import ListaDespesasDeputado from './ListaDespesasDeputado'
import DespesaComentarios from './DespesaComentarios'
import ComentarioRespostas from './ComentarioRespostas'
import Ranking from './Ranking'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (localStorage.apitoken) {
        return <Component {...props} />
      } else {
        return <Redirect to="/login" />
      }
    }} />
  );
}

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => {
      if (!localStorage.apitoken) {
        return <Component {...props} />
      } else {
        return <Redirect to="/deputados" />
      }
    }} />
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <Switch>
            <PrivateRoute exact path='/deputados' component={Home} />
            <PrivateRoute exact path='/deputado-:deputadoId-despesas' component={ListaDespesasDeputado} />
            <PrivateRoute exact path='/deputado-:deputadoId-despesa-:despesaId-comentarios' component={DespesaComentarios} />
            <PrivateRoute exact path='/deputado-:deputadoId-despesa-:despesaId-comentario-:comentarioId-respostas' component={ComentarioRespostas} />
            <PrivateRoute exact path='/ranking' component={Ranking} />
            <PublicRoute exact path='/' component={HomePage} />
            <PublicRoute exact path='/login' component={Login} />
            <PublicRoute exact path='/register' component={Register} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
