import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import pokemonApi from '../services/api';

const usePokemonStore = create(
  persist(
    (set, get) => ({
      // Состояние
      pokemons: [],
      filteredPokemons: [],
      isLoading: false,
      error: null,
      offset: 0,
      limit: 20,
      hasMore: true,
      searchTerm: '',
      selectedType: '',
      types: [],
      favorites: [],

      // Методы
      fetchPokemons: async () => {
        const { offset, limit, pokemons } = get();

        if (!get().hasMore) return;

        set({ isLoading: true, error: null });

        try {
          // Получаем список покемонов с базовой информацией
          const response = await pokemonApi.getPokemons(offset, limit);
          const newPokemonsData = response.data;

          // Получаем детальную информацию о каждом покемоне
          const pokemonDetailsPromises = newPokemonsData.results.map(
            pokemon => pokemonApi.getPokemonByName(pokemon.name)
          );

          const pokemonDetailsResponses = await Promise.all(pokemonDetailsPromises);

          // Проверяем, что ID не дублируется в текущем списке покемонов
          const existingIds = get().pokemons.map(p => p.id);

          const newPokemons = pokemonDetailsResponses.map(res => {
            const pokemon = res.data;
            return {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
              types: pokemon.types.map(type => type.type.name),
              height: pokemon.height,
              weight: pokemon.weight,
              abilities: pokemon.abilities.map(ability => ability.ability.name),
              stats: pokemon.stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat
              }))
            };
          });

          // Фильтруем дубликаты по ID перед добавлением в список
          const uniqueNewPokemons = newPokemons.filter(newPokemon => 
            !get().pokemons.some(existingPokemon => existingPokemon.id === newPokemon.id)
          );

          set(state => ({
            pokemons: [...state.pokemons, ...uniqueNewPokemons],
            filteredPokemons: state.searchTerm || state.selectedType 
              ? get().applyFilters([...state.pokemons, ...uniqueNewPokemons])
              : [...state.pokemons, ...uniqueNewPokemons],
            offset: state.offset + limit,
            hasMore: newPokemonsData.next !== null,
            isLoading: false
          }));

        } catch (error) {
          set({ error: error.message, isLoading: false });
          console.error('Error fetching pokemons:', error);
        }
      },

      fetchPokemonTypes: async () => {
        try {
          const response = await pokemonApi.getPokemonTypes();
          set({ types: response.data.results });
        } catch (error) {
          console.error('Error fetching pokemon types:', error);
        }
      },

      // Поиск покемонов
      searchPokemons: async (term) => {
        if (!term) return;

        set({ isLoading: true, error: null });

        try {
          // Сначала пробуем найти по имени или ID
          const directResult = await pokemonApi.searchPokemon(term);

          if (directResult.data) {
            // Нашли конкретного покемона
            const pokemon = directResult.data;
            const formattedPokemon = {
              id: pokemon.id,
              name: pokemon.name,
              image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
              types: pokemon.types.map(type => type.type.name),
              height: pokemon.height,
              weight: pokemon.weight,
              abilities: pokemon.abilities.map(ability => ability.ability.name),
              stats: pokemon.stats.map(stat => ({
                name: stat.stat.name,
                value: stat.base_stat
              }))
            };

            // Добавляем его в список, если его там еще нет
            set(state => {
              const exists = state.pokemons.some(p => p.id === formattedPokemon.id);
              if (!exists) {
                return {
                  pokemons: [...state.pokemons, formattedPokemon],
                  filteredPokemons: [formattedPokemon],
                  isLoading: false
                };
              }
              return {
                filteredPokemons: state.pokemons.filter(p => p.id === formattedPokemon.id),
                isLoading: false
              };
            });
          } else {
            // Применяем фильтр к существующим покемонам
            set(state => ({
              filteredPokemons: get().applyFilters(state.pokemons),
              isLoading: false
            }));
          }
        } catch (error) {
          set({ 
            error: 'Не удалось найти покемона. Попробуйте другой запрос.', 
            isLoading: false 
          });
          console.error('Error searching pokemons:', error);
        }
      },

      setSearchTerm: (searchTerm) => {
        set({ searchTerm });
        if (searchTerm) {
          get().searchPokemons(searchTerm);
        } else {
          set({ filteredPokemons: get().pokemons });
        }
      },

      setSelectedType: (selectedType) => {
        set({ selectedType, filteredPokemons: get().applyFilters(get().pokemons) });
      },

      applyFilters: (pokemonList) => {
        const { searchTerm, selectedType } = get();
        let filtered = [...pokemonList];

        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filtered = filtered.filter(pokemon => 
            pokemon.name.toLowerCase().includes(term) ||
            pokemon.id.toString() === term
          );
        }

        if (selectedType) {
          filtered = filtered.filter(pokemon => 
            pokemon.types.includes(selectedType)
          );
        }

        return filtered;
      },

      // Управление избранными покемонами
      toggleFavorite: (pokemonId) => {
        set(state => {
          const isFavorite = state.favorites.includes(pokemonId);
          return {
            favorites: isFavorite
              ? state.favorites.filter(id => id !== pokemonId)
              : [...state.favorites, pokemonId]
          };
        });
      },

      isFavorite: (pokemonId) => {
        return get().favorites.includes(pokemonId);
      },

      // Получение эволюций покемона
      fetchPokemonEvolutions: async (pokemonId) => {
        try {
          set({ isLoading: true });

          // Получаем информацию о виде покемона
          const speciesResponse = await pokemonApi.getPokemonSpecies(pokemonId);
          const evolutionChainUrl = speciesResponse.data.evolution_chain.url;

          // Получаем цепочку эволюций
          const evolutionResponse = await axios.get(evolutionChainUrl);
          const evolutionChain = evolutionResponse.data.chain;

          // Рекурсивно проходим по цепочке эволюций и собираем все формы
          const extractEvolutions = (chain) => {
            const evolutionData = [];

            // Получаем ID из URL
            const getIdFromUrl = (url) => {
              const parts = url.split('/');
              return parseInt(parts[parts.length - 2], 10);
            };

            // Начинаем с базовой формы
            const id = getIdFromUrl(chain.species.url);
            evolutionData.push({
              id,
              name: chain.species.name,
              min_level: null, // Базовая форма не имеет уровня эволюции
              trigger: null,
              item: null
            });

            // Обрабатываем эволюции
            if (chain.evolves_to && chain.evolves_to.length > 0) {
              for (const evolution of chain.evolves_to) {
                const evoDetails = evolution.evolution_details[0] || {};
                const evoId = getIdFromUrl(evolution.species.url);

                evolutionData.push({
                  id: evoId,
                  name: evolution.species.name,
                  min_level: evoDetails.min_level,
                  trigger: evoDetails.trigger?.name,
                  item: evoDetails.item?.name
                });

                // Рекурсивно обрабатываем следующие эволюции
                if (evolution.evolves_to && evolution.evolves_to.length > 0) {
                  for (const nextEvo of evolution.evolves_to) {
                    const nextEvoDetails = nextEvo.evolution_details[0] || {};
                    const nextEvoId = getIdFromUrl(nextEvo.species.url);

                    evolutionData.push({
                      id: nextEvoId,
                      name: nextEvo.species.name,
                      min_level: nextEvoDetails.min_level,
                      trigger: nextEvoDetails.trigger?.name,
                      item: nextEvoDetails.item?.name
                    });
                  }
                }
              }
            }

            return evolutionData;
          };

          const evolutions = extractEvolutions(evolutionChain);
          set({ isLoading: false });

          return evolutions;

        } catch (error) {
          console.error('Error fetching pokemon evolutions:', error);
          set({ isLoading: false });
          return [];
        }
      },

      // Получение рекомендаций похожих покемонов
      getSimilarPokemons: (pokemon, limit = 4) => {
        if (!pokemon) return [];

        // Находим покемонов с похожими типами
        const similar = get().pokemons.filter(p => 
          p.id !== pokemon.id && 
          p.types.some(type => pokemon.types.includes(type))
        );

        // Сортируем по количеству совпадающих типов (больше совпадений - выше в списке)
        similar.sort((a, b) => {
          const aMatches = a.types.filter(type => pokemon.types.includes(type)).length;
          const bMatches = b.types.filter(type => pokemon.types.includes(type)).length;
          return bMatches - aMatches;
        });

        return similar.slice(0, limit);
      },

      resetFilters: () => {
        set({ 
          searchTerm: '', 
          selectedType: '', 
          filteredPokemons: get().pokemons 
        });
      },

      resetState: () => {
        set({ 
          pokemons: [],
          filteredPokemons: [],
          offset: 0,
          hasMore: true,
          searchTerm: '',
          selectedType: '' 
        });
      }
    }),
    {
      name: 'pokemon-storage', // имя для localStorage
      partialize: (state) => ({ favorites: state.favorites }), // сохраняем только избранное
    }
  )
);

export default usePokemonStore;
