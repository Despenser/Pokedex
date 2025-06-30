import { FaCircle } from 'react-icons/fa';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative">
        <FaCircle className="text-pokemon-red text-4xl animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/2 h-0.5 bg-white"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600">Загрузка покемонов...</p>
    </div>
  );
};

export default LoadingSpinner;
