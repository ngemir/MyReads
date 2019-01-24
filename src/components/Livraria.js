import React from 'react'
import Estande from './Estande'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MeusLivros } from './MeusLivros'

class Livraria extends React.Component {
    static propTypes = {
        livros: PropTypes.array.isRequired,
        moveEstande: PropTypes.func.isRequired
    }

    render() {

        const estandes = MeusLivros(this.props.livros)

        
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    {[...estandes].map(([key, cont]) =>
                        <Estande 
                        key={key}
                        titulo={cont.title}
                        livros={cont.livros} 
                        moveEstande={this.props.moveEstande}/>
                    )}    
                </div>
                <div className="open-search">
                <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Livraria