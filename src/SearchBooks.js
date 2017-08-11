// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import type { Book } from './BookShelf';
import { serializeShelf } from './BookShelf';
import { searchOnline } from './BooksAPI';

class SearchBooks extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      query: '',
      results: []
    };
  }
  state: {
    query: string,
    results: Array<Book>
  };
  props: {
    onMarkBook: (Event, Book) => void
  };

  updateQuery = (query: string) => {
    searchOnline(query.trim()).then(res => {
      console.log(res);
      this.setState({ query: query.trim(), results: res.filter(b => b) });
    });
  };
  handleKeyDown = (e: any): void => {
    if (e.keyCode === 27) {
      this.setState({ query: '' });
      e.target.value = '';
    } else if (e.keyCode === 13) {
      this.updateQuery(e.target.value);
    }
  };
  render() {
    return (
      <div>
        <div className="search-books-bar">
          <Link to="/library" className="close-search" role="link" tabIndex={0}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map(book =>
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
export default SearchBooks;
