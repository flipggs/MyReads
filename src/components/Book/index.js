import React, { Component } from 'react'

class Book extends Component {

    render() {
        const { book, onChangeShelf } = this.props
        //console.log('book', book)

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={
                        {
                            width: 128,
                            height: 193,
                            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`
                        }}></div>
                    <div className="book-shelf-changer">
                        <select defaultValue="none" value={book.shelf} onChange={(e) => { onChangeShelf(book, e.target.value) }}>
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
}

export default Book