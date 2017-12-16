import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './../Book/index';
import * as BooksAPI from '../../BooksAPI'
import IF from './../IF/index';

class Search extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
    }

    onChangeSearch = (e) => {
        const { target } = e
        const { value } = target

        if (value.length && value.length >= 3) {

            BooksAPI.search(value).then(books => {

                if (books && books.length > 0)
                    this.setState({ books })
                else
                    this.setState({ books: [] })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    render() {
        const { onChangeShelf } = this.props

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" onChange={this.onChangeSearch} />
                    </div>
                </div>
                <div className="search-books-results">
                    <IF test={this.state.books.length > 0} >
                        <ol className="books-grid">
                            {this.state.books.map(book => (
                                <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
                            ))}
                        </ol>
                    </IF>
                    <IF test={this.state.books.length === 0}>
                        <h3>No result found </h3>
                    </IF>
                </div>
            </div>
        )
    }
}

export default Search