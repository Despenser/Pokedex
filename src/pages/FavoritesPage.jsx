import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeartBroken } from 'react-icons/fa';
import usePokemonStore from '../store/pokemonStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PokemonCard from '../components/PokemonCard';
import LoadingSpinner from '../components/LoadingSpinner';

const FavoritesPage = () => {
  const { pokemons, favorites } = usePokemonStore();
  const [favoritePokemons, setFavoritePokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Фильтруем покемонов из общего списка, которые есть в избранном
    const pokemonsInFavorites = pokemons.filter(pokemon => 
      favorites.includes(pokemon.id)
    );

    setFavoritePokemons(pokemonsInFavorites);
    setLoading(false);
  }, [pokemons, favorites]);

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Избранные покемоны</h1>

        {loading ? (
          <div className="py-12 flex justify-center">
            <LoadingSpinner />
          </div>
        ) : favoritePokemons.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {favoritePokemons.map(pokemon => (
              <motion.div key={pokemon.id} variants={itemVariants}>
                <PokemonCard pokemon={pokemon} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 text-center"
          >
            <FaHeartBroken className="text-gray-400 text-5xl mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-4">
              У вас пока нет избранных покемонов
            </p>
            <p className="text-gray-400">
              Добавляйте покемонов в избранное, нажимая на иконку сердца на карточке
            </p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
