const formatDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  const dateObj = new Date(date);

  if (isNaN(dateObj.getTime())) {
    console.error('Invalid date:', date);
    return 'Неверная дата';
  }

  return new Intl.DateTimeFormat('ru', options).format(dateObj);
};

export default formatDate;
