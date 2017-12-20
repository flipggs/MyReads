import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search/'
import ListBooks from './components/ListBooks/'

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

        if (shelf === "none") {//remove book
          const books = prev.books.filter(b => b.id !== book.id)

          return { books }
        }
        else {
          const foundIt = prev.books.filter(b => b.id === book.id)

          if (foundIt.length > 0) {//update book
            const books = this.updateShelfBook(prev.books, book, shelf)

            return { books }
          }
          else {//add new book

            const books = this.addNewBookShelf(prev.books, book, shelf)

            return { books }
          }
        }


      })
    }).catch(err => {
      console.log(err)
    })
  }

  updateShelfBook(books, book, shelf) {
    return books.map(b => {
      if (b.id === book.id) {
        b.shelf = shelf
      }
      return b
    })
  }

  addNewBookShelf(books, book, shelf) {
    book.shelf = shelf
    books.push(book)

    return books
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
