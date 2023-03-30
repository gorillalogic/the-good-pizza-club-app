import { Location } from '../../models/Map';

export function getGeolocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(null);
    }
  });
}

export function getGeocode(
  location: Location
): Promise<google.maps.GeocoderResult[]> {
  return new Promise((resolve, reject) => {
    const { Geocoder } = google.maps;
    const geocoder = new Geocoder();

    geocoder.geocode({ location }, (results) => {
      if (results) {
        resolve(results);
      } else {
        reject(null);
      }
    });
  });
}
