// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import { parseShelf } from './BookShelf';
import type { Book } from './BookShelf';
import './App.css';
import { getAll } from './BooksAPI';

class BooksApp extends React.Component {
  constructor(props: void) {
    super(props);
    this.state = {
      books: []
      // books2: new Map()
    };
  }
  state: {
    books: Array<Book>
    // books2: Map<string, Book>
  };
  componentDidMount() {
    getAll().then(books => {
      console.log(books);
      this.setState({ books });
    });
  }

  // this.state.books = Array.from([
  //   {
  //     title: 'To Kill a Mockingbird',
  //     authors: ['Harper Lee'],
  //     image:
  //       'http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api',
  //     id: '1',
  //     shelf: 'Reading'
  //   },
  //   {
  //     title: `Ender's Game`,
  //     authors: ['Orson Scott Card'],
  //     image:
  //       'http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api',
  //     id: '2',
  //     shelf: 'Reading'
  //   },
  //   {
  //     title: '1776',
  //     authors: ['David McCullough'],
  //     image:
  //       'http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api',
  //     id: '3',
  //     shelf: 'Want'
  //   },
  //   {
  //     title: 'Harry Potter and the Sorcerer&apos;s Stone',
  //     authors: ['J.K. Rowling'],
  //     image:
  //       'http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api',
  //     id: '4',
  //     shelf: 'Want'
  //   },
  //   {
  //     title: 'The Hobbit',
  //     authors: ['J.R.R. Tolkien'],
  //     image:
  //       'http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api',
  //     id: '5',
  //     shelf: 'Read'
  //   },
  //   {
  //     title: `Oh, the Places You'll Go!`,
  //     authors: ['Seuss'],
  //     image:
  //       'http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api',
  //     id: '6',
  //     shelf: 'Read'
  //   },
  //   {
  //     title: 'The Adventures of Tom Sawyer',
  //     authors: ['Mark Twain'],
  //     image:
  //       'http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api',
  //     id: '6',
  //     shelf: 'Read'
  //   }
  // ]);
  // this.state.books2 = new Map();

  assignBook = (
    event: Event & { currentTarget: window.HTMLInputElement },
    b: Book
  ): void => {
    b.shelf = parseShelf(event.currentTarget.value);
    event.currentTarget.defaultValue = event.currentTarget.value;
    this.setState(state => ({
      books: state.books.filter(_b => _b.id !== b.id).concat([b])
    }));
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => <SearchBooks onMarkBook={this.assignBook} />}
        />
        <Route
          path="/library"
          render={() =>
            <div className="list-books">
              <div>
                <button
                  onClick={() => {
                    getAll().then(r => console.log(r));
                  }}
                >
                  checkBooks
                </button>
              </div>
              <ListBooks
                books={this.state.books}
                onMarkBook={this.assignBook}
              />
            </div>}
        />
      </div>
    );
  }
}

export default BooksApp;
