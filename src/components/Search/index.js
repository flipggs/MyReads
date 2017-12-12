import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './../Book/index';
import * as BooksAPI from '../../BooksAPI'

class Search extends Component {

    constructor(props){
        super(props)

        this.state = {
            books: []
        }
    }

    onChangeSearch = (e) => {
        const { target } = e
        const {value} = target
        
        if (value.length >=3){
            BooksAPI.search(value).then(books => {
                if (books && books.length > 0)
                    this.setState({books})
                else
                    this.setState({books: []})
            }).catch(err => {
                console.log(err.toString())
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
                    <ol className="books-grid">
                        {this.state.books.map(book => (
                            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search