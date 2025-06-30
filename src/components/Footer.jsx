import { FaGithub, FaCode, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-pokemon-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-pokemon mb-2">PokéDex</h2>
            <p className="text-gray-400">
              Данные предоставлены <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-pokemon-yellow hover:underline">PokéAPI</a>
            </p>
          </div>

          <div className="flex items-center">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white mx-2"
              aria-label="GitHub"
            >
              <FaGithub size={24} />
            </a>
            <div className="text-gray-400 mx-2 flex items-center">
              <span>Сделано с</span>
              <FaHeart className="mx-1 text-pokemon-red" />
              <span>и</span>
              <FaCode className="mx-1" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {currentYear} PokéDex. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
