// @flow
import React, { Component } from 'react';
import type { Book, Shelf } from './flowtypes';

export const parseShelf = (s: string): Shelf => {
  switch (s) {
    case 'currentlyReading':
      return 'Reading';
    case 'read':
      return 'Read';
    case 'wantToRead':
      return 'Want';
    default:
      return 'None';
  }
};
export const serializeShelf = (s: Shelf): string => {
  switch (s) {
    case 'Reading':
      return 'currentlyReading';
    case 'Read':
      return 'read';
    case 'Want':
      return 'wantToRead';
    case 'None':
      return 'none';
    default:
      return 'none';
  }
};

const shelfName = (name: Shelf): string => {
  switch (name) {
    case 'Reading':
      return 'Currently Reading';
    case 'Read':
      return 'Already Read';
    case 'Want':
      return 'Want to read';
    default:
      return '';
  }
};

class BookShelf extends Component {
  props: {
    bookList: Array<Book>,
    list: Shelf,
    onMarkBook: (Event, Book) => void
  };

  render() {
    const { bookList, list } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelfName(list)}
        </h2>
        <div className="bookshelf-books">
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
                        value={serializeShelf(book.shelf)}
                        onChange={event => this.props.onMarkBook(event, book)}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
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
        </div>
      </div>
    );
  }
}

export default BookShelf;
