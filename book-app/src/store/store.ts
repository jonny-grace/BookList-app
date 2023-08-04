import { atom,selectorFamily } from 'recoil';
import { Book,APIBook } from '../types/Book';
import axios from 'axios';


const API="http://localhost:4000/books"

export const bookListState = atom<Book[]>({
  key: 'bookListState',
  default: [],
});

export const booksState = atom<Book[]>({
  key: 'booksState',
  default: [],
});

export const fetchBooksState = selectorFamily<Book[], number>({
  key: 'fetchBooksState',
  get: (page) => async () => {
  
    const response = await axios.get(`${API}?_page=${page}&_limit=10`);
    const books = response.data.map((book: APIBook) => ({
  id: book.id,
  title: book.title,
  description: book.description,
  discountRate: book.discountrate, // Access non-camel-cased property
  coverImage: book.coverimage, // Access non-camel-cased property
  price: book.price,
})) as Book[];
    return books;
  },
});


