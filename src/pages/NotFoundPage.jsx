import { Link } from 'react-router-dom';
import { FaHome, FaQuestionCircle } from 'react-icons/fa';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-pokemon-red mb-6">404</h1>
          <p className="text-2xl font-medium text-gray-700 mb-8">
            Страница не найдена
          </p>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Похоже, что этот покемон сбежал или никогда не существовал.
            Попробуйте другой маршрут или вернитесь на главную страницу.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center px-6 py-3 bg-pokemon-red text-white font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaHome className="mr-2" />
              На главную
            </Link>

            <Link 
              to="/about" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            >
              <FaQuestionCircle className="mr-2" />
              О проекте
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;
