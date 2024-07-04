const daysFromToday = (date) => {
  try {
    date = date.toDate();
  } catch {
    date = new Date(date.seconds * 1000 + date.nanoseconds / 1000000);
  }
  const currentDate = new Date();
  const timeDifference = date - currentDate;
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
};

const getBackgroundImage = (city, time, rain) => {
  const cityString = city.replace(/\s/g, "").toLowerCase().replace("city", "");
  const night = time > 18 || time < 6 ? true : false;
  const isRain = rain > 0 ? true : false;
  if (!["newyork", "sanfrancisco"].includes(cityString)) {
    return null;
  }
  return require(`../assets/${cityString}-${night}-${isRain}.png`);
};

export { daysFromToday, getBackgroundImage };
