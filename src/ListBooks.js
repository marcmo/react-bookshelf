// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { Map } from 'immutable';
import BookShelf from './BookShelf';
import type { Book, Shelf, BookMap } from './flowtypes';

class ListBooks extends Component {
  filterByShelf = (s: Shelf): Array<Book> => {
    console.log("filterByShelf");
    console.log(this.props.books);
    // const res = this.props.books.toArray().filter(
    const res = Array.from(this.props.books.values()).filter(
      (b: Book) => b.shelf === s
    );
    return res;
  };

  props: {
    books: BookMap,
    onMarkBook: (Event, Book) => void
  };

  render() {
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
              bookList={this.filterByShelf('Reading')}
              list="Reading"
              onMarkBook={this.props.onMarkBook}
            />
            <BookShelf
              bookList={this.filterByShelf('Want')}
              list="Want"
              onMarkBook={this.props.onMarkBook}
            />
            <BookShelf
              bookList={this.filterByShelf('Read')}
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
