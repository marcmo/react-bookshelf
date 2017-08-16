// @flow
import { Map } from 'immutable';

export type Shelf = 'Reading' | 'Read' | 'Want' | 'None';
export type Book = {
  title: string,
  authors: [string],
  image: string,
  id: string,
  shelf: Shelf
};
export type BookMap = Map<string, Book>;
