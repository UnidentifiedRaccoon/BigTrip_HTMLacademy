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
export const castTimeFormat = (value) => (value >= 10 ? `${value}` : `0${value}`);

export const getPerformedTimeDiff = (dateFrom, dateTo) => {
  const isLeapYear = (yr) => !((yr % 4) || (!(yr % 100) && (yr % 400)));
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  // Get yearsDiff
  let years = dateTo.getFullYear() - dateFrom.getFullYear();
  // Get monthsDiff
  let months = dateTo.getMonth() - dateFrom.getMonth();
  if (months < 0) {
    years -= 1;
    months = 12 + months;
  }
  // Get daysDiff
  let days = dateTo.getDate() - dateFrom.getDate();
  if (days < 0) {
    months -= 1;
    const isFeb = DAYS_IN_MONTH[dateFrom.getMonth()] === 28;
    if (isLeapYear(dateFrom.getFullYear()) && isFeb) {
      days = 29 + days;
    } else {
      days = DAYS_IN_MONTH[dateFrom.getMonth()] + days;
    }
  }
  // Get hoursDiff
  let hours = dateTo.getHours() - dateFrom.getHours();
  if (hours < 0) {
    days -= 1;
    hours = 24 + hours;
  }
  // Get minutesDiff
  let minutes = dateTo.getMinutes() - dateFrom.getMinutes();
  if (minutes < 0) {
    hours -= 1;
    minutes = 60 + minutes;
  }
  return {
    years, months, days, hours, minutes,
  };
};

export const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template.trim();
  return div.firstChild;
};

export const render = (container, element, method = 'append') => {
  switch (method) {
    case 'append':
      container.append(element);
      break;
    case 'prepend':
      container.prepend(element);
      break;
    default:
      container.append(element);
      break;
  }
};
