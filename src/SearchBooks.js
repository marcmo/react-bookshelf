// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Map } from 'immutable';
import debounce from 'lodash.debounce';
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

  updateQueryNotDebounced = (query: string) => {
    const trimmed: string = query.trim();
    this.setState({
      query: trimmed,
      results: [],
      searchActive: trimmed.length > 0
    });
    if (trimmed.length > 0) {
      searchOnline(trimmed).then(res => {
        this.setState((state: State) => ({
          query: state.query,
          results:
            state.query.length > 0
              ? res.filter(b => b).map(this.updateStatus)
              : [],
          searchActive: false
        }));
      });
    }
  };
  updateQueryDebounced = debounce(this.updateQueryNotDebounced, 150);
  updateQuery = (query: string) => {
    if (query.trim().length > 0) {
      this.updateQueryDebounced(query);
    } else {
      this.updateQueryDebounced.cancel();
      this.updateQueryNotDebounced('');
    }
  };

  handleKeyDown = (e: any): void => {
    if (e.keyCode === 27) {
      this.setState({ query: '' });
      e.target.value = '';
    }
  };
  loaderClass = () => (this.state.searchActive ? 'loadersmall' : '');

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
              onChange={event => this.updateQueryDebounced(event.target.value)}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div className={this.loaderClass()} />
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
