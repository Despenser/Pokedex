const PokemonCardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col animate-pulse">
      <div className="h-48 bg-gray-300"></div>

      <div className="p-4 flex-grow">
        <div className="h-4 w-16 bg-gray-300 mb-4 rounded"></div>
        <div className="h-6 w-32 bg-gray-300 mb-4 rounded"></div>

        <div className="flex gap-2">
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;
