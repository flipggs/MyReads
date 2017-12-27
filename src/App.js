import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search/'
import ListBooks from './components/ListBooks/'
import AlertContainer from 'react-alert'

class BooksApp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      books: []
    }

    this.alertOptions = {
      offset: 14,
      position: 'bottom left',
      theme: 'dark',
      time: 5000,
      transition: 'scale'
    }
  }

  showAlert = (msg) => {
    this.msg.show(msg, {
      time: 2000,
      type: 'success'
    })
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

        let books = []
        let msg = ''

        if (shelf === "none") {//remove book
          books = prev.books.filter(b => b.id !== book.id)

          msg = 'Book remove successfully'
        }
        else {
          const foundIt = prev.books.filter(b => b.id === book.id)

          if (foundIt.length > 0) {//update book
            books = this.updateShelfBook(prev.books, book, shelf)

            msg = 'Book updated successfully'
          }
          else {//add new book
            books = this.addNewBookShelf(prev.books, book, shelf)

            msg = 'Book added successfully'
          }
        }

        this.showAlert(msg)

        return { books }

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
        <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />

        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onChangeShelf={this.onChangeShelf} />
        )} />
        <Route path="/search" render={() => (
          <Search books={this.state.books} onChangeShelf={this.onChangeShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
