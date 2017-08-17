// @flow
import React, { Component } from 'react';
import type { Book } from './flowtypes';

class BooksGrid extends Component {
  props: {
    bookList: Array<Book>,
    onMarkBook: (Event, Book) => void
  };

  render() {
    const { bookList } = this.props;
    return (
      <ol className="books-grid">
        {bookList.map(book =>
          <li key={book.id} className="book-list-item">
            <div className="book">
              <div className="book-top">
                <div
                  className="book-cover"
                  style={{
                    width: 128,
                    height: 193,
                    backgroundImage: `url(${book.image})`
                  }}
                />
                <div className="book-shelf-changer">
                  <select
                    value={book.shelf}
                    onChange={event => this.props.onMarkBook(event, book)}
                  >
                    <option value="none" disabled>
                      Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">
                {book.title}
              </div>
              <div className="book-authors">
                {book.authors}
              </div>
            </div>
          </li>
        )}
      </ol>
    );
  }
}

export default BooksGrid;
