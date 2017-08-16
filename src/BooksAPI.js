// @flow
import { Map } from 'immutable';
import type { Book, BookMap } from './flowtypes';
import { parseShelf } from './BookShelf';

const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
// xn2k7xo7
let token = window.localStorage.token;
if (!token) {
  token = Math.random().toString(36).substr(-8);
  window.localStorage.token = token;
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

const toBook = (b: any): ?Book => {
  if (
    !b ||
    !b.title ||
    !b.authors ||
    !b.id ||
    !b.imageLinks ||
    !b.imageLinks.thumbnail
  ) {
    console.log(`could not parse book ${b}`);
    return null;
  }
  return {
    title: b.title,
    authors: b.authors,
    image: b.imageLinks.thumbnail,
    id: b.id,
    shelf: parseShelf(b.shelf)
  };
};

export const get = (bookId: string): Promise<?Book> =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => toBook(data.book));

export const getAll = (): Promise<Array<Book>> =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(
      data => (data.books.error ? new Array(0) : data.books.map(b => toBook(b)))
    );
export const getAllAsMap = (): Promise<BookMap> =>
  getAll().then(res => res.reduce((acc, x) => acc.set(x.id, x), new Map()));

export const update = (book: Book, shelf: string): Promise<JSON> =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());

export const searchOnline = (
  query: string,
  maxResults?: number = 100
): Promise<Array<Book>> =>
  fetch(`${api}/search`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, maxResults })
  })
    .then(res => res.json())
    .then(
      data => (data.books.error ? new Array(0) : data.books.map(b => toBook(b)))
    );
