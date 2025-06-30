import { useState, useEffect, useCallback } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';
import usePokemonStore from '../store/pokemonStore';

const SearchBar = () => {
  const { setSearchTerm, searchTerm, resetFilters } = usePokemonStore();
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  // Дебаунсинг поиска для предотвращения слишком частых запросов
  const debouncedSearch = useCallback(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      if (localSearchTerm.trim()) {
        setSearchTerm(localSearchTerm);
      }
      setIsSearching(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearchTerm, setSearchTerm]);

  useEffect(() => {
    if (localSearchTerm !== searchTerm) {
      return debouncedSearch();
    }
  }, [localSearchTerm, searchTerm, debouncedSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim()) {
      setSearchTerm(localSearchTerm);
    }
  };

  const handleClear = () => {
    setLocalSearchTerm('');
    resetFilters();
  };

  return (
    <div className="bg-gray-100 py-4 shadow-sm sticky top-16 z-10">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              placeholder="Поиск по имени или номеру"
              className="w-full py-2 px-4 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pokemon-red"
              aria-label="Поиск покемона"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />

            {localSearchTerm && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                aria-label="Очистить поиск"
              >
                <FaTimes />
              </button>
            )}
          </div>

          <button 
            type="submit" 
            className="bg-pokemon-red text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            disabled={isSearching}
          >
            {isSearching ? "Поиск..." : "Найти"}
          </button>

          {searchTerm && (
            <button 
              type="button" 
              onClick={handleClear}
              className="bg-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Сбросить
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
