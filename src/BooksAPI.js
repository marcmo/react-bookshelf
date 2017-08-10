// @flow
import type { Book } from './BookShelf';

const api = 'https://reactnd-books-api.udacity.com';

// Generate a unique token for storing your bookshelf data on the backend server.
let token = window.localStorage.token;
if (!token) {
  token = Math.random().toString(36).substr(-8);
  window.localStorage.token = token;
}

const headers = {
  Accept: 'application/json',
  Authorization: token
};

export const get = (bookId: any) =>
  fetch(`${api}/books/${bookId}`, { headers })
    .then(res => res.json())
    .then(data => data.book);

export const getAll = () =>
  fetch(`${api}/books`, { headers })
    .then(res => res.json())
    .then(data => data.books);

export const update = (book: any, shelf: any) =>
  fetch(`${api}/books/${book.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ shelf })
  }).then(res => res.json());

function toBook(b: any): ?Book {
  if (
    !b ||
    !b.title ||
    !b.authors ||
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
    shelf: 'None'
  };
}

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
