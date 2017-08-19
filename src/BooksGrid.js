// @flow
import React from 'react';
import type { Book } from './flowtypes';

type Props = {
  bookList: Array<Book>,
  onMarkBook: (Event, Book) => void
};

const BooksGrid = (props: Props) => {
  const { bookList, onMarkBook } = props;
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
                  onChange={event => onMarkBook(event, book)}
                >
                  <option value="none" disabled>
                    Move to...
                  </option>
                  <option value="Reading">Currently Reading</option>
                  <option value="Want">Want to Read</option>
                  <option value="Read">Read</option>
                  <option value="None">None</option>
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
};

export default BooksGrid;
