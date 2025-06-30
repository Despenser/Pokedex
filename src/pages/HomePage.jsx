import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import TypeFilter from '../components/TypeFilter';
import PokemonGrid from '../components/PokemonGrid';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow">
        <SearchBar />
        <TypeFilter />
        <PokemonGrid />
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
