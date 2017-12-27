import React from 'react'
import Book from './../Book/'
import PropTypes from 'prop-types'

const BookShelf = (props) => {
    const { shelf, onChangeShelf } = props
    const { books } = shelf || []
    let name = ''

    if (shelf.type === 'currentlyReading')
        name = 'Currently Reading'
    else if (shelf.type === 'wantToRead')
        name = 'Want To Read'
    else if (shelf.type === 'read')
        name = 'Read'

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
                    ))}

                </ol>
            </div>
        </div>
    )
}

BookShelf.propTypes = {
    shelf: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf