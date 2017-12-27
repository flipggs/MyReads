import React from 'react'
import BookShelf from './../BookShelf/'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import _ from 'underscore'

const ListBooks = (props) => {
    const { books, onChangeShelf } = props

    const groupShelfs = _.groupBy(books, 'shelf')

    const shelfs = _.map(groupShelfs, group => {
        return {
            type: group[0].shelf,
            books: group
        }
    })

    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">

                {shelfs.length > 0 && shelfs.map(shelf => (
                    <BookShelf key={shelf.type} shelf={shelf} onChangeShelf={onChangeShelf} />
                ))}


            </div>
            <div className="open-search">
                <Link to="/search"> Add a book </Link>
            </div>
        </div>
    )
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default ListBooks