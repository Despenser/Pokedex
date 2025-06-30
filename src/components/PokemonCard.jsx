import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import usePokemonStore from '../store/pokemonStore';

const PokemonCard = ({ pokemon }) => {
  const { id, name, image, types } = pokemon;
  const { toggleFavorite, isFavorite } = usePokemonStore();
  const [isHovered, setIsHovered] = useState(false);

  // Проверяем, добавлен ли покемон в избранное
  const favorite = isFavorite(id);

  // Форматирование ID покемона в формате #001
  const formattedId = `#${id.toString().padStart(3, '0')}`;

  // Получение цвета фона карточки на основе первого типа покемона
  const primaryType = types[0];

  // Обработчик клика по кнопке избранного
  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Предотвращаем переход по ссылке
    toggleFavorite(id);
  };

  return (
    <Link 
      to={`/pokemon/${id}`} 
      className="block transform hover:scale-105 transition-transform duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 h-full flex flex-col relative">
        {/* Кнопка избранного */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${favorite ? 'opacity-100 bg-white/80' : (isHovered ? 'opacity-100 bg-white/50' : 'opacity-0')} hover:bg-white/80`}
          aria-label={favorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          {favorite ? (
            <FaHeart className="text-pokemon-red text-xl" />
          ) : (
            <FaRegHeart className="text-gray-600 text-xl" />
          )}
        </button>

        <div 
          className={`h-48 flex items-center justify-center p-4 bg-type-${primaryType}`}
          style={{ backgroundColor: `var(--type-${primaryType}, #f0f0f0)` }}
        >
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="max-h-full object-contain drop-shadow-lg" 
              loading="lazy"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-500">Нет изображения</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-grow">
          <span className="text-gray-500 font-medium block">{formattedId}</span>
          <h2 className="text-xl font-bold capitalize mb-2">{name.replace(/-/g, ' ')}</h2>

          <div className="flex gap-2 flex-wrap">
            {types.map(type => (
              <span 
                key={type}
                className={`px-3 py-1 rounded-full text-white text-xs font-medium capitalize bg-type-${type}`}
                style={{ backgroundColor: `var(--type-${type}, #777)` }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PokemonCard;
