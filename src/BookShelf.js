// @flow
import React, { Component } from 'react';

export type Shelf = 'Reading' | 'Read' | 'Want' | 'None';
export type Book = {
  title: string,
  authors: [string],
  image: string,
  shelf: Shelf
};

function shelfName(name: Shelf): string {
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
}
class BookShelf extends Component {
  props: {
    books: Array<Book>,
    list: Shelf
  };
  render() {
    const { books, list } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">
          {shelfName(list)}
        </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book =>
              <li key={book.title} className="book-list-item">
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
                      <select>
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
