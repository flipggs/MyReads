import React, { Component } from 'react'
import BookShelf from './../BookShelf/';
import { Link } from 'react-router-dom'

class ListBooks extends Component {

    render() {

        const { shelfs } = this.props
        
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">

                    {shelfs.length > 0 && shelfs.map(shelf => (
                        <BookShelf key={shelf.type} shelf={shelf} />
                    ))}


                </div>
                <div className="open-search">
                    <Link to="/search"> Add a book </Link>
                </div>
            </div>
        )
    }
}

export default ListBooks