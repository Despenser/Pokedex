import { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { motion } from 'framer-motion';
import usePokemonStore from '../store/pokemonStore';
import PokemonCard from './PokemonCard';
import PokemonCardSkeleton from './PokemonCardSkeleton';
import LoadingSpinner from './LoadingSpinner';

const PokemonGrid = () => {
  const { 
    filteredPokemons,
    fetchPokemons, 
    isLoading, 
    error, 
    hasMore,
    searchTerm,
    selectedType 
  } = usePokemonStore();

  useEffect(() => {
    if (filteredPokemons.length === 0 && !searchTerm && !selectedType) {
      fetchPokemons();
    }
  }, [fetchPokemons, filteredPokemons.length, searchTerm, selectedType]);

  // Анимация для появления контента
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg inline-block"
        >
          <p className="font-medium">Ошибка: {error}</p>
          <button 
            onClick={fetchPokemons}
            className="mt-4 bg-pokemon-red text-white py-2 px-6 rounded-lg hover:bg-red-600 transition-colors"
          >
            Попробовать снова
          </button>
        </motion.div>
      </div>
    );
  }

  if (filteredPokemons.length === 0 && !isLoading && (searchTerm || selectedType)) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-12"
        >
          <p className="text-gray-500 text-xl mb-4">Покемоны не найдены</p>
          <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <InfiniteScroll
        dataLength={filteredPokemons.length}
        next={fetchPokemons}
        hasMore={hasMore && !searchTerm && !selectedType}
        loader={<div className="py-4"><LoadingSpinner /></div>}
        endMessage={
          <div className="text-center py-8 text-gray-500">
            {filteredPokemons.length > 0 && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Вы просмотрели всех покемонов!
              </motion.p>
            )}
          </div>
        }
      >
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPokemons.map(pokemon => (
            <motion.div key={pokemon.id} variants={itemVariants}>
              <PokemonCard pokemon={pokemon} />
            </motion.div>
          ))}

          {/* Скелетоны для загрузки новых карточек */}
          {isLoading && hasMore && Array(4).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`}>
              <PokemonCardSkeleton />
            </div>
          ))}
        </motion.div>
      </InfiniteScroll>

      {isLoading && filteredPokemons.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8"
        >
          {Array(8).fill(0).map((_, index) => (
            <PokemonCardSkeleton key={`initial-skeleton-${index}`} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default PokemonGrid;
