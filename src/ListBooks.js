// @flow
import React, { Component } from 'react';
import escapeStringRegexp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import type { Book, Shelf } from './BookShelf';

class ListBooks extends Component {
  state = {
    query: ''
  };
  props: {
    books: Array<Book>,
    onMarkBook: (Event, Book) => void
  };

  render() {
    const { books } = this.props;
    const { query } = this.state;
    let filteredBooks: Array<Book>;
    if (query) {
      const escaped = escapeStringRegexp(query);
      const m = new RegExp(escaped, 'i');
      filteredBooks = books.filter(c => m.test(c.title));
    } else {
      filteredBooks = books;
    }
    filteredBooks.sort(sortBy('name'));
    return (
      <div className="list-books">
        <div className="row bg-dark">
          <div className="col-2">
            <Link className="open-search" to="/search">
              Search
            </Link>
          </div>
          <div className="col-10 list-books-title">
            <h1>MyReads</h1>
          </div>
        </div>

        <div className="list-books-content">
          <div>
            <BookShelf
              books={filteredBooks.filter(b => b.shelf === ('Reading': Shelf))}
              list="Reading"
              onMarkBook={this.props.onMarkBook}
            />
            <BookShelf
              books={filteredBooks.filter(b => b.shelf === ('Want': Shelf))}
              list="Want"
              onMarkBook={this.props.onMarkBook}
            />
            <BookShelf
              books={filteredBooks.filter(b => b.shelf === ('Read': Shelf))}
              list="Read"
              onMarkBook={this.props.onMarkBook}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default ListBooks;
