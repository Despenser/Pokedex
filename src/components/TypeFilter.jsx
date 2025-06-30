import { useEffect } from 'react';
import usePokemonStore from '../store/pokemonStore';

const TypeFilter = () => {
  const { types, fetchPokemonTypes, selectedType, setSelectedType, resetFilters } = usePokemonStore();

  useEffect(() => {
    if (types.length === 0) {
      fetchPokemonTypes();
    }
  }, [types.length, fetchPokemonTypes]);

  // Функция для определения стилей кнопки типа
  const getTypeButtonStyles = (typeName) => {
    const isSelected = selectedType === typeName;
    const baseClasses = "px-4 py-1.5 rounded-full text-white text-sm font-medium capitalize transition-transform hover:scale-105";

    return {
      className: baseClasses + (isSelected ? " ring-2 ring-white ring-offset-2" : ""),
      style: { 
        backgroundColor: `var(--type-${typeName}, #777)`,
        ...(isSelected ? { ringOffsetColor: `var(--type-${typeName}, #777)` } : {})
      }
    };
  };

  return (
    <div className="bg-white py-4 border-b">
      <div className="container mx-auto px-4">
        <h2 className="text-lg font-bold mb-3">Фильтр по типу</h2>

        <div className="flex flex-wrap gap-2">
          {types.map(type => {
            const buttonStyles = getTypeButtonStyles(type.name);
            return (
              <button
                key={type.name}
                onClick={() => setSelectedType(type.name)}
                className={buttonStyles.className}
                style={buttonStyles.style}
              >
                {type.name}
              </button>
            );
          })}

          {selectedType && (
            <button
              onClick={resetFilters}
              className="px-4 py-1.5 rounded-full bg-gray-300 text-gray-800 text-sm font-medium hover:bg-gray-400 transition-colors"
            >
              Сбросить фильтр
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TypeFilter;
