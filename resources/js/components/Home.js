import React, { Component } from 'react'
import Header from './Header'
import ListaDeputados from './ListaDeputados'

class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <ListaDeputados />
      </div>
    )
  }
}

export default Home
