import React from 'react'
import PropTypes from 'prop-types'

class Livro extends React.Component {
    static propTypes = {
        book: PropTypes.object,
        moveEstande: PropTypes.func.isRequired,
    }

    options = [
        { key: 'currentlyReading', title: 'Currently Reading' },
        { key: 'wantToRead', title: 'Want to Read' },
        { key: 'read', title: 'Read' },
        { key: 'none', title: 'None' }
    ]

    // Evento de mudança de estande
    handleShelf = (event) => {
        event.preventDefault()
        const { livro } = this.props
        livro.shelf = event.target.value
        this.props.moveEstande(livro)
    }


    render() {

        const { title, authors, imageLinks, shelf } = this.props.livro
        const smallThumbnail = imageLinks ? imageLinks.smallThumbnail : ''


        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover fade" style={{ width: 128, height: 193, backgroundImage: `url(${smallThumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select value={shelf} onChange={this.handleShelf} >
                                <option value="disabled" disabled>Move to...</option>
                                {this.options.map(({ key, title }) => (
                                    <option key={key} value={key}>{title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    <div className="book-authors">{authors}</div>
                </div>
            </li>
        )
    }
}

export default Livro