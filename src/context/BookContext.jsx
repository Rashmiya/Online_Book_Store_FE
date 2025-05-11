import React, { createContext, useMemo, useState } from "react";
import { getLocalStoragedata } from "../pages/helpers/StorageHelper";

export const BookContext = createContext({});
export function BookContextProvider({ children }) {
  const [filters, setFilters] = useState({
    page: 1,
    perPage: 10,
    sort: 1,
    bookName: "",
    ISBN_number: "",
    searchTerm: "",
    defaultFilter: "newRelease",
    popularAuthors: undefined,
    priceMin: "",
    priceMax: "",
    availability: "",
    types: undefined,
  });
  const [bookData, setBookData] = useState(null);
  const [books, setBooks] = useState([]);
  const [orderDetails, setOrderDetails] = useState(
    getLocalStoragedata("orderDetails"),
  );

  const updateFilters = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  const contextValue = useMemo(
    () => ({
      filters,
      setFilters,
      updateFilters,

      books,
      setBooks,

      bookData,
      setBookData,

      orderDetails,
      setOrderDetails,
    }),
    [filters, books, bookData, orderDetails],
  );

  return (
    <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>
  );
}

export default BookContext;
