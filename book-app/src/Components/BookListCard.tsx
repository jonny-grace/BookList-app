import React from "react";
import { Book } from "../types/Book";

interface Props {
  book: Book;
}

const BookListCard: React.FC<Props> = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative" style={{ paddingBottom: "100%" }}>
        <img
          className="absolute h-full w-full"
          src={book.coverImage}
          alt={`${book.title} cover`}
        />
      </div>
      <div className="p-4 mx-4">
        <h2 className="text-3xl font-medium">{book.title}</h2>

        <div className="flex items-center mt-4 justify-between">
          <p className="font-san text-red-600 font-bold text-3xl">
            {book.discountRate}%
          </p>
          <span className="text-black font-bold pr-16 md:text-5xl text-2xl">
            ${book.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookListCard;