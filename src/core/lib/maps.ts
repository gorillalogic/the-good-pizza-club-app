import { Loader } from '@googlemaps/js-api-loader';

export async function initMapLoader() {
  const loader = new Loader({
    apiKey: process.env.REACT_APP_MAPS_API_KEY || '',
    version: 'weekly',
  });

  await loader.load();
  await google.maps.importLibrary('maps');
  await google.maps.importLibrary('geocoding');
  await google.maps.importLibrary('places');
}
