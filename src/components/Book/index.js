import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {
    const { book, onChangeShelf } = props
    //console.log('book', book)

    return (
        <div className="book">
            <div className="book-top">
                <div className="book-cover" style={{backgroundImage: `url("${book.imageLinks.smallThumbnail}")`}}></div>
                <div className="book-shelf-changer">
                    <select defaultValue={book.shelf || "none"} onChange={(e) => { onChangeShelf(book, e.target.value) }}>
                        <option value="none" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            {book.authors && book.authors.length > 0 && book.authors.map((author, index) => (
                <div className="book-authors" key={index}>{author}</div>
            ))}

        </div>
    )
}



Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}




export default Book