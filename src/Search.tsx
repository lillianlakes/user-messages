import React, { useState } from "react";

interface SearchProp {
  handleSearch:  (term: string) => void;
}

function Search( props: SearchProp) {
  let initial: string = "";
  const [search, setSearch] = useState(initial);

  function handleChange(evt: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = evt.target;
    setSearch(value);
  }

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    props.handleSearch(search);
    setSearch(initial);
  }

  return (
    <div className="Search">
      <form className="Search-Form" onSubmit={handleSubmit}>
        <label htmlFor="search">Search: </label>
        <input name="term" id="term" 
        onChange={handleChange}>
          
        </input>
        <button type="submit">Get SW Facts</button>
      </form>
    </div>
  );
}

export default Search;
