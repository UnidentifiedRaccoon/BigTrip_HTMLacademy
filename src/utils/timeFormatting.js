import moment from 'moment';

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

const getPerformedTimeDiff2 = (dateFrom, dateTo) => {
  const from = moment(dateFrom);
  let to = moment(dateTo);
  // Get yearsDiff
  const years = to.diff(from, 'years');
  to = to.subtract(years, 'years');

  // Get monthsDiff
  const months = to.diff(from, 'months');
  to = to.subtract(months, 'months');

  // Get daysDiff
  const days = to.diff(from, 'days');
  to = to.subtract(days, 'days');

  // Get hoursDiff
  const hours = to.diff(from, 'hours');
  to = to.subtract(hours, 'hours');
  // Get minutesDiff
  const minutes = to.diff(from, 'minutes');
  return {
    years, months, days, hours, minutes,
  };
};

export const getFormattedDuration = (dateFrom, dateTo) => {
  const { days, hours, minutes } = getPerformedTimeDiff2(dateFrom, dateTo);

  const castedDay = days > 0 ? `${castTimeFormat(days)}D` : '';
  const castedHours = hours > 0 ? `${castTimeFormat(hours)}H` : '';
  const castedMinutes = minutes > 0 ? `${castTimeFormat(minutes)}M` : '';

  return `${castedDay} ${castedHours} ${castedMinutes}`;
};
