import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import useDebounce from '../../hooks/useDebounce'; // Import useDebounce hook

const SearchFilter = ({ filterFunction, className }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const debouncedQuery = useDebounce(query, 500); // Debounce the query input

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Trigger filter function when debounced query changes
  React.useEffect(() => {
    filterFunction(debouncedQuery);
    navigate(`?page=1&pageSize=10`, { replace: true });
  }, [debouncedQuery, filterFunction, navigate]);

  return (
    <div className={`flex my-4 ${className}`}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
      />
    </div>
  );
};

export default SearchFilter;
