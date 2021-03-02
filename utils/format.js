const getFormatDate = (date) => {
  const newData = new Date(date);

  const year = newData.getFullYear();
  let month = 1 + newData.getMonth();
  month = month >= 10 ? month : "0" + month;
  let day = newData.getDate();
  day = day >= 10 ? day : "0" + day;
  return `${year}-${month}-${day}`;
};

export { getFormatDate };
