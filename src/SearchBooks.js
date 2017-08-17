// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import BooksGrid from './BooksGrid';
import type { Book, BookMap } from './flowtypes';
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
          <BooksGrid
            bookList={this.state.results}
            onMarkBook={this.props.onMarkBook}
          />
        </div>
      </div>
    );
  }
}
export default SearchBooks;
