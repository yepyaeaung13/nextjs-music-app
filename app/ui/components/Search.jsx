"use client";
import React from "react";
const Search = ({ searchHandler }) => {
  return (
    <input
      type="search"
      autoFocus
      name=""
      id=""
      onKeyUp={searchHandler}
      placeholder="search by song's name"
      className="bg-palette_one border-b border-green-600 rounded-2xl focus:outline-none px-3 h-8 md:w-96 w-52"
    />
  );
};

export default Search;
