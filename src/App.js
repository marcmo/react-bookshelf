// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import { Map } from 'immutable';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { parseShelf, serializeShelf } from './BookShelf';
import type { Book, BookMap } from './flowtypes';
import './App.css';
import { getAllAsMap, update } from './BooksAPI';

type State = {
  books: BookMap
};

class BooksApp extends React.Component {
  state: State = {
    books: new Map()
  };

  componentDidMount() {
    getAllAsMap().then((books: BookMap) => {
      this.setState({ books });
    });
  }

  assignBook = (
    event: Event & { currentTarget: window.HTMLInputElement },
    b: Book
  ): void => {
    b.shelf = parseShelf(event.currentTarget.value);
    event.currentTarget.defaultValue = b.shelf;
    update(b, serializeShelf(b.shelf)).then(_ => {
      this.setState((state: State): State => ({
        books: state.books.set(b.id, b)
      }));
    });
  };

  render() {
    return (
      <div className="container-fluid">
        <div className="app">
          <Route
            exact
            path="/search"
            render={() =>
              <SearchBooks
                books={this.state.books}
                onMarkBook={this.assignBook}
              />}
          />
          <Route
            exact
            path="/"
            render={() =>
              <ListBooks
                books={this.state.books}
                onMarkBook={this.assignBook}
              />}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
