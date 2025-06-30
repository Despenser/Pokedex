import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

// Создаем инстанс axios с базовыми настройками
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  }
);

// API сервис для работы с покемонами
const pokemonApi = {
  // Получение списка покемонов с пагинацией
  getPokemons: async (offset = 0, limit = 20) => {
    return apiClient.get(`/pokemon`, { params: { offset, limit } });
  },

  // Получение информации о конкретном покемоне
  getPokemonById: async (id) => {
    return apiClient.get(`/pokemon/${id}`);
  },

  // Получение информации о конкретном покемоне по имени
  getPokemonByName: async (name) => {
    return apiClient.get(`/pokemon/${name.toLowerCase()}`);
  },

  // Получение информации о виде покемона
  getPokemonSpecies: async (id) => {
    return apiClient.get(`/pokemon-species/${id}`);
  },

  // Получение списка типов покемонов
  getPokemonTypes: async () => {
    return apiClient.get(`/type`);
  },

  // Получение покемонов определенного типа
  getPokemonsByType: async (type) => {
    return apiClient.get(`/type/${type}`);
  },

  // Поиск покемонов по имени или ID
  searchPokemon: async (query) => {
    try {
      // Пробуем найти по имени/id напрямую
      return await apiClient.get(`/pokemon/${query.toLowerCase()}`);
    } catch (error) {
      // Если не нашли, возвращаем пустой результат
      return { data: null };
    }
  }
};

export default pokemonApi;
