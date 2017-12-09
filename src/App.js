import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './components/Search/';
import ListBooks from './components/ListBooks/';

import _ from 'underscore'

class BooksApp extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      shelfs: []
    }
  }

  componentDidMount(){
    BooksAPI.getAll().then(books => {
      const groupShelfs = _.groupBy(books, 'shelf')

      const shelfs = _.map(groupShelfs, group => {
        return {
          type: group[0].shelf,
          books: group
        }
      })

      console.log('shelfs', shelfs)
      this.setState({ shelfs })
      
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks shelfs={this.state.shelfs} />
        )}  />
        <Route path="/search" component={Search} />
      </div>
    )
  }
}

export default BooksApp
