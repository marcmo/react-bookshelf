// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import type { Book, BookMap } from './flowtypes';
import { serializeShelf } from './BookShelf';
import { searchOnline } from './BooksAPI';

type State = {
  query: string,
  results: Array<Book>,
  searchActive: boolean
};
type DefaultProps = {
  books: BookMap,
  onMarkBook: (Event, Book) => void
};
type Props = {
  books: BookMap,
  onMarkBook: (Event, Book) => void
};

class SearchBooks extends Component<DefaultProps, Props, State> {
  static defaultProps = {
    books: new Map(),
    onMarkBook: () => {}
  };
  state: State = {
    query: '',
    results: [],
    searchActive: false
  };

  props: {
    books: BookMap,
    onMarkBook: (Event, Book) => void
  };

  updateStatus = (book: Book): Book => this.props.books.get(book.id) || book;

  updateQuery = (query: string) => {
    const trimmed: string = query.trim();
    if (trimmed.length === 0) {
      this.setState(
        ({
          query: trimmed,
          results: [],
          searchActive: false
        }: State)
      );
    } else {
      this.setState({
        query: trimmed,
        results: [],
        searchActive: true
      });
      searchOnline(trimmed).then(res => {
        this.setState({
          query: trimmed,
          results: res.filter(b => b).map(this.updateStatus),
          searchActive: false
        });
      });
    }
  };
  handleKeyDown = (e: any): void => {
    if (e.keyCode === 27) {
      this.setState({ query: '' });
      e.target.value = '';
    }
  };
  render() {
    return (
      <div>
        <div className="search-books-bar">
          <Link to="/" className="close-search" role="link" tabIndex={0}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={event => this.updateQuery(event.target.value)}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div>
            <span className="badge badge-pill badge-primary">
              {this.state.searchActive ? 'searching' : ''}
            </span>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results.map((book: Book) =>
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
