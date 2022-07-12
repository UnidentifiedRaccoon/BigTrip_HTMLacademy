export const SortTypes = {
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
};

export const getRandomIntNumber = (a = 1, b = 0) => {
  // Определяем максимум и минимум
  const max = Math.max(a, b);
  const min = Math.min(a, b);
  // Т.к далее используется Math.ceil, то верхняя граница (max) фактически становится недостижимой
  // случайное число принимает максимальное значение только если Math.random() = 1;
  // Поэтому мы добавляем единицу к случайному числу используем Math.random() < 1;
  let random = Math.random();
  while (random >= 1) random = Math.random();

  return min + Math.floor(random * (max - min + 1));
};

export const getRandomArrayItem = (arr) => arr[getRandomIntNumber(0, arr.length - 1)];
