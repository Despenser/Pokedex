import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaQuestionCircle } from 'react-icons/fa';
import usePokemonStore from '../store/pokemonStore';
import pokemonApi from '../services/api';

const EvolutionChain = ({ pokemonId }) => {
  const [evolutions, setEvolutions] = useState([]);
  const [evolutionDetails, setEvolutionDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchPokemonEvolutions } = usePokemonStore();

  useEffect(() => {
    const loadEvolutions = async () => {
      setLoading(true);

      try {
        // Получаем цепочку эволюций
        const evolutionData = await fetchPokemonEvolutions(pokemonId);
        setEvolutions(evolutionData);

        // Получаем детали для каждого покемона в цепочке
        const detailsPromises = evolutionData.map(evo => 
          pokemonApi.getPokemonById(evo.id)
            .then(res => ({
              id: evo.id,
              name: evo.name,
              image: res.data.sprites.other['official-artwork'].front_default || res.data.sprites.front_default,
              types: res.data.types.map(type => type.type.name),
              min_level: evo.min_level,
              trigger: evo.trigger,
              item: evo.item
            }))
            .catch(() => null)
        );

        const detailsResults = await Promise.all(detailsPromises);
        setEvolutionDetails(detailsResults.filter(detail => detail !== null));

      } catch (error) {
        console.error('Error loading evolution chain:', error);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) {
      loadEvolutions();
    }
  }, [pokemonId, fetchPokemonEvolutions]);

  if (loading) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-500">Загрузка эволюций...</p>
      </div>
    );
  }

  if (evolutionDetails.length <= 1) {
    return (
      <div className="py-4 text-center">
        <p className="text-gray-500 flex items-center justify-center gap-2">
          <FaQuestionCircle />
          <span>У этого покемона нет эволюций</span>
        </p>
      </div>
    );
  }

  // Форматирование условия эволюции
  const formatEvolutionTrigger = (pokemon) => {
    if (!pokemon.min_level && !pokemon.trigger && !pokemon.item) return '';

    if (pokemon.trigger === 'level-up' && pokemon.min_level) {
      return `Уровень ${pokemon.min_level}`;
    } else if (pokemon.trigger === 'use-item' && pokemon.item) {
      return `Использовать ${pokemon.item.replace(/-/g, ' ')}`;
    } else if (pokemon.trigger) {
      return pokemon.trigger.replace(/-/g, ' ');
    }

    return 'Особые условия';
  };

  return (
    <div className="py-4">
      <h3 className="text-xl font-bold mb-6">Цепочка эволюций</h3>

      <div className="flex flex-wrap justify-center items-center gap-4">
        {evolutionDetails.map((pokemon, index) => (
          <div key={pokemon.id} className="flex items-center">
            <Link to={`/pokemon/${pokemon.id}`} className="text-center">
              <div 
                className={`w-20 h-20 mx-auto mb-2 rounded-full flex items-center justify-center overflow-hidden ${pokemonId === pokemon.id ? 'bg-pokemon-red/10 ring-2 ring-pokemon-red' : 'bg-gray-100'}`}
              >
                <img 
                  src={pokemon.image} 
                  alt={pokemon.name} 
                  className="max-w-full max-h-full object-contain" 
                />
              </div>
              <span className="block text-sm font-medium capitalize">
                {pokemon.name.replace(/-/g, ' ')}
              </span>
            </Link>

            {index < evolutionDetails.length - 1 && (
              <div className="flex flex-col items-center mx-4">
                <FaArrowRight className="text-gray-400 mb-1" />
                <span className="text-xs text-gray-500 text-center max-w-24">
                  {formatEvolutionTrigger(evolutionDetails[index + 1])}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EvolutionChain;
