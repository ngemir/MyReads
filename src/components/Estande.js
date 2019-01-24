import React from 'react'
import Livro from './Livro'
import PropTypes from 'prop-types'


class Estande extends React.Component{
    static propTypes = {
        livros: PropTypes.array.isRequired,
        titulo: PropTypes.string,
    }
    
    render(){

        const {livros, title} = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {livros.map((livro) =>
                        <Livro key={livro.id} livro={livro}
                        moveEstande={this.props.moveEstande} />
                    )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Estande