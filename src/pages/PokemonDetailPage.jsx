import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaWeight, FaRulerVertical, FaHeart, FaRegHeart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import pokemonApi from '../services/api';
import { motion } from "framer-motion";
import usePokemonStore from '../store/pokemonStore';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';
import EvolutionChain from '../components/EvolutionChain';
import SimilarPokemons from '../components/SimilarPokemons';

const PokemonDetailPage = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);
  const { toggleFavorite, isFavorite, pokemons } = usePokemonStore();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorite, setFavorite] = useState(false);

  // Получение соседних покемонов для навигации
  const prevPokemonId = numericId > 1 ? numericId - 1 : null;
  const nextPokemonId = numericId < 898 ? numericId + 1 : null; // Ограничение по количеству покемонов

  useEffect(() => {
    // Проверяем, является ли покемон избранным
    setFavorite(isFavorite(numericId));
  }, [numericId, isFavorite]);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        setLoading(true);

        // Пробуем найти покемона в существующем списке
        const existingPokemon = pokemons.find(p => p.id === numericId);

        if (existingPokemon) {
          // Если покемон уже загружен, получаем только описание
          const speciesResponse = await pokemonApi.getPokemonSpecies(numericId);

          // Находим русское описание, если есть
          const description = speciesResponse.data.flavor_text_entries
            .find(entry => entry.language.name === 'ru')?.flavor_text ||
            speciesResponse.data.flavor_text_entries
            .find(entry => entry.language.name === 'en')?.flavor_text ||
            'Нет доступного описания';

          setPokemon({
            ...existingPokemon,
            description: description.replace(/\f/g, ' ')
          });
        } else {
          // Если покемона нет в списке, загружаем все данные
          const response = await pokemonApi.getPokemonById(numericId);
          const pokemonData = response.data;

          // Получение дополнительной информации о виде покемона (описание и т.д.)
          const speciesResponse = await pokemonApi.getPokemonSpecies(numericId);

          // Находим русское описание, если есть
          const description = speciesResponse.data.flavor_text_entries
            .find(entry => entry.language.name === 'ru')?.flavor_text ||
            speciesResponse.data.flavor_text_entries
            .find(entry => entry.language.name === 'en')?.flavor_text ||
            'Нет доступного описания';

          setPokemon({
            id: pokemonData.id,
            name: pokemonData.name,
            image: pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default,
            types: pokemonData.types.map(type => type.type.name),
            height: pokemonData.height / 10, // Конвертация из дециметров в метры
            weight: pokemonData.weight / 10, // Конвертация из гектограммов в килограммы
            abilities: pokemonData.abilities.map(ability => ability.ability.name),
            stats: pokemonData.stats.map(stat => ({
              name: stat.stat.name,
              value: stat.base_stat
            })),
            description: description.replace(/\f/g, ' ')
          });
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching pokemon details:', error);
        setError('Не удалось загрузить информацию о покемоне');
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [numericId, pokemons]);

  const handleToggleFavorite = () => {
    toggleFavorite(numericId);
    setFavorite(!favorite);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <div className="flex-grow container mx-auto px-4 py-16 text-center">
          <p className="text-red-500 text-xl mb-4">{error}</p>
          <Link to="/" className="text-pokemon-blue hover:underline">
            Вернуться на главную
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pokemon) return null;

  if (!pokemon) return null;

  // Форматирование ID покемона в формате #001
  const formattedId = `#${pokemon.id.toString().padStart(3, '0')}`;

  // Перевод названий характеристик на русский
  const statNames = {
    'hp': 'ОЗ',
    'attack': 'Атака',
    'defense': 'Защита',
    'special-attack': 'Сп. атака',
    'special-defense': 'Сп. защита',
    'speed': 'Скорость'
  };

  // Определение цвета фона на основе первого типа покемона
  const primaryType = pokemon.types[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Навигация */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="inline-flex items-center text-pokemon-blue hover:underline">
            <FaArrowLeft className="mr-2" /> К списку
          </Link>

          <div className="flex gap-3">
            {prevPokemonId && (
              <Link 
                to={`/pokemon/${prevPokemonId}`}
                className="inline-flex items-center px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <FaChevronLeft className="mr-1" /> Пред.
              </Link>
            )}

            {nextPokemonId && (
              <Link 
                to={`/pokemon/${nextPokemonId}`}
                className="inline-flex items-center px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                След. <FaChevronRight className="ml-1" />
              </Link>
            )}
          </div>
        </div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Шапка с основной информацией */}
          <div 
            className={`p-8 bg-type-${primaryType} relative`}
            style={{ backgroundColor: `var(--type-${primaryType}, #f0f0f0)` }}
          >
            <button
              onClick={handleToggleFavorite}
              className="absolute top-4 right-4 z-10 p-2 bg-white/70 hover:bg-white/90 rounded-full transition-colors"
              aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              {favorite ? (
                <FaHeart className="text-pokemon-red text-2xl" />
              ) : (
                <FaRegHeart className="text-gray-600 text-2xl" />
              )}
            </button>

            <div className="container mx-auto flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                <span className="text-white text-lg font-medium block mb-1 opacity-80">{formattedId}</span>
                <h1 className="text-white text-4xl font-bold capitalize mb-4">
                  {pokemon.name.replace(/-/g, ' ')}
                </h1>

                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {pokemon.types.map(type => (
                    <span 
                      key={type}
                      className="px-4 py-1.5 rounded-full text-white text-sm font-medium capitalize"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-1/2 flex justify-center md:justify-end">
                <motion.img 
                  src={pokemon.image} 
                  alt={pokemon.name} 
                  className="max-h-64 object-contain drop-shadow-lg" 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Основная информация */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">О покемоне</h2>
                <p className="text-gray-700 mb-6">{pokemon.description}</p>

                <div className="flex gap-6 mb-6">
                  <div className="flex items-center">
                    <FaWeight className="mr-2 text-gray-500" />
                    <div>
                      <span className="block text-lg font-medium">{pokemon.weight} кг</span>
                      <span className="text-sm text-gray-500">Вес</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <FaRulerVertical className="mr-2 text-gray-500" />
                    <div>
                      <span className="block text-lg font-medium">{pokemon.height} м</span>
                      <span className="text-sm text-gray-500">Рост</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-2">Способности</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {pokemon.abilities.map(ability => (
                    <span 
                      key={ability}
                      className="px-3 py-1 rounded-lg bg-gray-200 text-gray-800 text-sm capitalize"
                    >
                      {ability.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">Базовые характеристики</h2>

                {pokemon.stats.map((stat, index) => {
                  // Определение цвета полосы прогресса в зависимости от значения
                  let barColor = 'bg-yellow-500';
                  if (stat.value < 50) barColor = 'bg-red-500';
                  else if (stat.value >= 100) barColor = 'bg-green-500';

                  return (
                    <motion.div 
                      key={stat.name} 
                      className="mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 font-medium">{statNames[stat.name] || stat.name}</span>
                        <span className="text-gray-900 font-bold">{stat.value}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <motion.div 
                          className={`${barColor} h-2.5 rounded-full`} 
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(stat.value, 100)}%` }}
                          transition={{ duration: 0.7, delay: index * 0.1 + 0.4 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Раздел эволюций */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <EvolutionChain pokemonId={pokemon.id} />
            </div>

            {/* Раздел похожих покемонов */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <SimilarPokemons pokemon={pokemon} />
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PokemonDetailPage;
