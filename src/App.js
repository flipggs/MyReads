import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search/';
import ListBooks from './components/ListBooks/';

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      //console.log('books', books)
      this.setState({ books })

    }).catch(err => {
      console.log(err)
    })
  }

  onChangeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(res => {
      this.setState(prev => {
        const foundIt = prev.books.filter(b => b.id === book.id)

        if (foundIt.length > 0) {
          const books = prev.books.map(b => {
            if (b.id === book.id) {
              b.shelf = shelf;
            }
            return b
          })

          return { books }
        }
        else {
          
          book.shelf = shelf
          prev.books.push(book)
          const { books } = prev

          return { books }
        }
      })
    }).catch(err => {
      console.log(err)
    })
  }

  render() {

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onChangeShelf={this.onChangeShelf} />
        )} />
        <Route path="/search" render={() => (
          <Search onChangeShelf={this.onChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
