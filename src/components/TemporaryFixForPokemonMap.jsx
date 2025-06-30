/**
 * Утилита для обеспечения уникальности ключей в списках
 * Используйте эту функцию при отображении списков для гарантии уникальности ключей
 */

/**
 * Генерирует уникальный ключ для элемента списка
 * @param {number|string} id - Идентификатор элемента
 * @param {number} index - Индекс элемента в массиве
 * @returns {string} Уникальный ключ
 */
export const generateUniqueKey = (id, index) => {
  return `${id}_${index}`;
};

/**
 * Проверяет массив объектов на наличие дубликатов по указанному полю
 * @param {Array<Object>} array - Массив объектов для проверки
 * @param {string} field - Поле, по которому проверяется уникальность
 * @returns {Array<number>} Массив индексов дубликатов
 */
export const findDuplicateIndices = (array, field) => {
  const values = {};
  const duplicateIndices = [];

  array.forEach((item, index) => {
    const value = item[field];
    if (values[value] !== undefined) {
      duplicateIndices.push(index);
    } else {
      values[value] = index;
    }
  });

  return duplicateIndices;
};
