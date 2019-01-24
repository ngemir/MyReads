import React from 'react'
import './App.css'
import * as BooksAPI from './API/BooksAPI'
import { Route } from 'react-router-dom' 


import BuscaLivro from './components/BuscaLivro.js'
import Livraria from './components/Livraria.js'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    // Array de livros
      livros: [],
    
    
     
      showSearchPage: false
  }

  // Pega todos os livros após carregar página
  async componentDidMount() {
    const livros = await BooksAPI.getAll()
    this.setState(() => ({ livros }))
  }

  // Muda a estande do livro
  moveEstande = (livro) => {
    BooksAPI.update(livro, livro.shelf).then((result) => {
      this.setState((state) => ({
        livros: state.livros.filter((l) => l.id !== livro.id)
      }))

      if (livro.shelf !== 'none')
        this.setState((state) => ({
          livros: state.livros.concat([livro])
        }))
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <Livraria livros={this.state.livros} moveEstande={this.moveEstande} />
        )} />
        <Route exact path="/search" render={() => (
          <BuscaLivro livros={this.state.livros} moveEstande={this.moveEstande} />
        )} />
      </div>
    )
  }
}

export default BooksApp
