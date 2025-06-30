import { Link, useLocation } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import PokeBallIcon from './PokeBallIcon';
import usePokemonStore from '../store/pokemonStore';

const Header = () => {
  const location = useLocation();
  const { favorites } = usePokemonStore();

  // Определяем активную ссылку
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-10 bg-pokemon-red shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-white font-pokemon text-2xl"
        >
          <PokeBallIcon className="text-white w-8 h-8 animate-bounce-slow" />
          <span>PokéDex</span>
        </Link>

        <nav>
          <ul className="flex gap-6 text-white font-medium">
            <li>
              <Link 
                to="/" 
                className={`hover:underline flex items-center ${isActive('/') ? 'underline' : ''}`}
              >
                Главная
              </Link>
            </li>
            <li>
              <Link 
                to="/favorites" 
                className={`hover:underline flex items-center gap-1 ${isActive('/favorites') ? 'underline' : ''}`}
              >
                <span>Избранное</span>
                {favorites.length > 0 && (
                  <span className="bg-white text-pokemon-red text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={`hover:underline ${isActive('/about') ? 'underline' : ''}`}
              >
                О проекте
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
