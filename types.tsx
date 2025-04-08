// URL : https://api.api-ninjas.com/v1/validatephone?number=+12065550100
export type ValidatePhoneAPI = { // Introducimos 'number' sacamos 'country'
  format_e164: string;
  country: string;
  is_valid: boolean;
};

// URL : https://api.api-ninjas.com/v1/country?name=United States
export type CountryAPI = { // Introducimos 'country' sacamos 'capital'
  capital: string;
};

// URL : https://api.api-ninjas.com/v1/geocoding?city=London&country=England
export type GeocodingAPI = { // Introducimos 'city' sacamos 'latitude' & 'longitude'
  latitude: string;
  longitude: string;
};

// URL : https://api.api-ninjas.com/v1/weather?lat=latitude&lon=longitude
export type WeatherAPI = { // Introducimos 'lat' y 'lon' y sacamos 'temp'
  temp: string;
};
