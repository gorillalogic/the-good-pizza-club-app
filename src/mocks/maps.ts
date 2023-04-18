/* eslint-disable @typescript-eslint/no-explicit-any */
const mockAutocomplete = jest.fn();
mockAutocomplete.prototype.addListener = jest.fn();
mockAutocomplete.prototype.unbindAll = jest.fn();

const mockGeocoder = jest.fn();
mockGeocoder.prototype.geocode = (_: any, success: any) => {
  success([
    {
      formatted_address: 'mock address',
      geometry: {
        location: {
          lat: jest.fn().mockReturnValue(0),
          lng: jest.fn().mockReturnValue(0),
        },
      },
    },
  ]);
};

export const MOCK_GOOGLE_MAPS = {
  maps: {
    Map: jest.fn(),
    Marker: jest.fn(),
    places: {
      Autocomplete: mockAutocomplete,
    },
    Geocoder: mockGeocoder,
  },
} as any;
