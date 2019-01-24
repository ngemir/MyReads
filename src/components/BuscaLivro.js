import React from 'react'
import PropTypes from 'prop-types'
import Livro from './Livro'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../API/BooksAPI'

class BuscaLivro extends React.Component {
    static propTypes = {
        livros: PropTypes.array.isRequired,
        moveEstande: PropTypes.func.isRequired,
    }

    //Inicia com a pesquisa vazia e mostrando todos os livros
    state = {
        pesquisa: '',
        livros: this.props.livros
    }

     // Procura a lista de livros do campo pesquisado
     atualizaPesquisa = (pesquisa) => {
        
        this.setState({ pesquisa : pesquisa})
        
        // Utiliza API para pesquisar
        BooksAPI.search(pesquisa).then((livrosPesquisados => {
            // Se estiver vazio não retorna livro
            if (!pesquisa) {
                this.setState({ livroPesquisados: [] });
                return
            }
            
            if (livrosPesquisados && !livrosPesquisados.error) {
                this.verEstande(livrosPesquisados)

                this.setState({ livrosPesquisados: livrosPesquisados })
            }
        }))  
    }

    verEstande = (livrosPesquisados) => {
        return livrosPesquisados.map((livro) => {
            const meusLivros = this.props.livros.find(el => el.id === livro.id);
      
            if (meusLivros) {
              livro.shelf = meusLivros.shelf;
            }

            return livro;
        })
    }
    
    render () {   

        const { livros } = this.state
        const { moveEstande } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                    {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                    */}
                    <input type="text" placeholder="Search by title or author" onChange={(event) => this.atualizaPesquisa(event.target.value)} />


                    {livros.length > 0 ? (
                        <ol className="books-grid">
                            {livros.map((livro) => (
                                <Livro key={livro.id} livro={livro} moveEstande={moveEstande} />
                            ))}
                        </ol>
                    ) : (
                        <div className="search-books-no-results">
                            <span>No results</span>
                        </div>
                    )}
                    </div>
                </div> 
            </div>
        )
    }
}

export default BuscaLivro