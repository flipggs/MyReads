import React from 'react'
import { Route } from 'react-router-dom'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search/';
import ListBooks from './components/ListBooks/';

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={ListBooks} />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp
