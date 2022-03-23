import React from 'react';


const Search = () => (
<form action="/" method="get">
<label htmlFor="header-search">
    <span className="">Etsi ravintolaa</span>
</label>
<input
    type="text"
    id="header-search"
    placeholder="Hae ravintolaa"
    name="s" 
/>
<button type="submit">Etsi ravintolaa</button>
</form>
);
export default Search;