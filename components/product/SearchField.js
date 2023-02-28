import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchField({ products, setFilteredProducts }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearchInput(value);
    const results = products.filter((product) => product.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredProducts(results);
  };

  return (
    <div className="search-container">
      <TextField
        fullWidth
        type="search"
        variant="outlined"
        value={searchInput}
        onChange={handleSearch}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}

SearchField.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  setFilteredProducts: PropTypes.func.isRequired,
};

export default SearchField;
