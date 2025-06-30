import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import usePokemonStore from '../store/pokemonStore';

const SimilarPokemons = ({ pokemon }) => {
  const { getSimilarPokemons } = usePokemonStore();

  if (!pokemon) return null;

  const similarPokemons = getSimilarPokemons(pokemon);

  if (similarPokemons.length === 0) return null;

  return (
    <div className="py-4">
      <h3 className="text-xl font-bold mb-4">Похожие покемоны</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {similarPokemons.map((similar, index) => (
          <motion.div 
            key={similar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={`/pokemon/${similar.id}`}
              className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow p-2 text-center"
            >
              <div 
                className={`w-full h-24 flex items-center justify-center rounded bg-type-${similar.types[0]}/20 mb-2`}
                style={{ backgroundColor: `var(--type-${similar.types[0]}, #f0f0f0)` }}
              >
                <img 
                  src={similar.image} 
                  alt={similar.name} 
                  className="max-h-20 object-contain" 
                  loading="lazy"
                />
              </div>

              <span className="text-sm font-medium text-gray-700 block mb-1">
                #{similar.id.toString().padStart(3, '0')}
              </span>
              <h4 className="text-base font-semibold capitalize">
                {similar.name.replace(/-/g, ' ')}
              </h4>

              <div className="flex justify-center gap-1 mt-2">
                {similar.types.map(type => (
                  <span 
                    key={type}
                    className={`px-2 py-0.5 rounded-full text-white text-xs capitalize bg-type-${type}`}
                    style={{ backgroundColor: `var(--type-${type}, #777)` }}
                  >
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SimilarPokemons;
