import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-pokemon-red">О проекте</h1>

          <div className="space-y-4">
            <p>
              Этот проект - интерактивная энциклопедия покемонов (PokéDex), разработанная с использованием современных веб-технологий.
            </p>

            <h2 className="text-xl font-bold mt-6 mb-2">Технологии</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>React 19 - для создания пользовательского интерфейса</li>
              <li>Vite - для быстрой сборки и разработки</li>
              <li>Zustand - для управления состоянием приложения</li>
              <li>React Router - для навигации</li>
              <li>Tailwind CSS - для стилизации</li>
              <li>Axios - для работы с API</li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-2">Функциональность</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Просмотр списка покемонов с бесконечной прокруткой</li>
              <li>Детальная информация о каждом покемоне</li>
              <li>Поиск по имени или номеру покемона</li>
              <li>Фильтрация по типу покемона</li>
              <li>Адаптивный дизайн для мобильных и десктопных устройств</li>
            </ul>

            <h2 className="text-xl font-bold mt-6 mb-2">Данные</h2>
            <p>
              Проект использует открытое API <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="text-pokemon-blue hover:underline">PokéAPI</a> для получения информации о покемонах.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
