import React, { useEffect, useState } from "react";
import {
  useRecoilValueLoadable,
  useRecoilState,
  useResetRecoilState,
} from "recoil";
import { fetchBooksState, booksState } from "../store/store";
import InfiniteScroll from "react-infinite-scroll-component";
import { Book } from "../types/Book";
import BookListCard from "./BookListCard";

function BookList() {
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [books, setBooks] = useRecoilState<Book[]>(booksState);
  const resetBooksState = useResetRecoilState(booksState);

  const fetchBooks = useRecoilValueLoadable<Book[]>(fetchBooksState(page));

  useEffect(() => {
    if (fetchBooks.state === "hasValue") {
      setBooks((oldBooks) => {
        // Filter out duplicate books based on their title
        const uniqueBooks = fetchBooks.contents.filter(
          (newBook) => !oldBooks.some((book) => book.title === newBook.title)
        );
        return [...oldBooks, ...uniqueBooks];
      });
      setHasMore(fetchBooks.contents.length > 0);
    }
  }, [fetchBooks.contents]);

  const fetchMoreBooks = () => {
    setPage((oldPage) => oldPage + 1);
  };
  const handleRefresh = () => {
    resetBooksState();
    setPage(1);
  };
  return (
    <>
      <p className="text-4xl py-6 font-bold text-center">Books</p>
      <InfiniteScroll
        dataLength={books.length}
        next={fetchMoreBooks}
        hasMore={hasMore}
        loader={null} // Set loader to null when all books are loaded
        endMessage={<h4>No more books</h4>}
        refreshFunction={handleRefresh}
        pullDownToRefresh
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center" }}>Release to refresh</h3>
        }
      >
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-2">
          {books.map((book) => (
            <BookListCard key={book.id} book={book} />
          ))}
        </div>
        {fetchBooks.state === "loading" && <div>Loading...</div>}
      </InfiniteScroll>
    </>
  );
}

export default BookList;
