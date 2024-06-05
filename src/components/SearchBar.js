import React, { useEffect, useState } from "react";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const inputElement = document.querySelector(".row.search-box input");
    inputElement.focus();
  }, []);

  const search = () => {
    window.location = `https://www.google.com/search?q=${searchTerm}`;
  };

  const onEnter = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="row search-box">
      <input
        type="text"
        placeholder="How long until I see Olivia?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onEnter}
      />
      {/* <button role="button" onClick={search}>
        Google
      </button> */}
    </div>
  );
}

export default SearchBar;
