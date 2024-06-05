const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          resolve({ lat, lng });
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

const getCity = async (lat, lng) => {
  const response = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${process.env.REACT_APP_BIG_DATA_CLOUD_API_KEY}`
  );
  const data = await response.json();
  const city = data.city;
  return city;
};

const getTimezone = async (lat, lng) => {
  const timezoneResponse = await fetch(
    `http://api.timezonedb.com/v2.1/get-time-zone?&key=${process.env.REACT_APP_TIMEZONE_API_KEY}&format=json&by=position&lat=${lat}&lng=${lng}`
  );

  const timezoneData = await timezoneResponse.json();
  const timezone = timezoneData.zoneName;
  return timezone;
};

const distance = (location1, location2) => {
  const latDiff = location1.lat - location2.lat;
  const lngDiff = location1.lng - location2.lng;
  const distanceInMiles =
    Math.sqrt(Math.pow(latDiff, 2) + Math.pow(lngDiff, 2)) * 69;
  return distanceInMiles;
};

export { getLocation, getCity, distance, getTimezone };
