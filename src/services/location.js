import axios from "axios";
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
  const response = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en&key=${process.env.REACT_APP_BIG_DATA_CLOUD_API_KEY}`
  );
  const data = response.data;
  const city = data.city;
  return city;
};

const getTimezone = async (lat, lng) => {
  const timestamp = Date.now().toString().slice(0, 10);
  const timezoneResponse = await axios.get(
    `https://maps.googleapis.com/maps/api/timezone/json?location=${lat}%2C${lng}&timestamp=${timestamp}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );

  const timezoneData = timezoneResponse.data;
  console.log(timezoneData);
  const timezone = timezoneData.timeZoneId;
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
