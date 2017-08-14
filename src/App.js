// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { parseShelf, serializeShelf } from './BookShelf';
import type { Book } from './BookShelf';
import './App.css';
import { getAll, update } from './BooksAPI';

class BooksApp extends React.Component {
  state: {
    books: Array<Book>
  } = {
    books: []
  };

  componentDidMount() {
    getAll().then(books => {
      console.log(books);
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
      this.setState(state => ({
        books: state.books.filter(_b => _b.id !== b.id).concat([b])
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
            render={() => <SearchBooks onMarkBook={this.assignBook} />}
          />
          <Route
            path="/"
            render={() =>
              <div className="list-books">
                <ListBooks
                  books={this.state.books}
                  onMarkBook={this.assignBook}
                />
              </div>}
          />
        </div>
      </div>
    );
  }
}

export default BooksApp;
