import * as React from "react";
import books from "../..//data/books";
import { Grid, Spacer } from "./style";
import BookCard from "./BookCard";

export default function BooksGrid() {
  return (
    <Grid>
      {books.map(book => (
        <BookCard key={book.url} book={book} />
      ))}

      <Spacer />
    </Grid>
  );
}
