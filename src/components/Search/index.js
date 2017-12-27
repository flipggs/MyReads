import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './../Book/index'
import * as BooksAPI from '../../BooksAPI'
import IF from './../IF/index'
import PropTypes from 'prop-types'

class Search extends Component {

    static propTypes = {
        onChangeShelf: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)

        this.state = {
            booksSearch: []
        }
    }

    onChangeSearch = (e) => {
        const { target } = e
        const { value } = target

        if (value.length && value.length >= 3) {

            BooksAPI.search(value).then(booksSearch => {

                if (booksSearch && booksSearch.length > 0)
                    this.setState({ booksSearch })
                else
                    this.setState({ booksSearch: [] })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        const { onChangeShelf, books } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.onChangeSearch} />
                    </div>
                </div>
                <div className="search-books-results">
                    <IF test={this.state.booksSearch.length > 0} >
                        <ol className="books-grid">
                            {this.state.booksSearch.map(book => {

                                const findBook = books.find(item => (
                                    item.id === book.id
                                ))

                                if (findBook)
                                    book.shelf = findBook.shelf

                                return <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
                            })}
                        </ol>
                    </IF>
                    <IF test={this.state.booksSearch.length === 0}>
                        <h3>No result found </h3>
                    </IF>
                </div>
            </div>
        )
    }
}

export default Search