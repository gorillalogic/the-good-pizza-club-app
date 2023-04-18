/* eslint-disable @typescript-eslint/no-explicit-any */
export const MOCK_GEOLOCATION = {
  getCurrentPosition: (success: PositionCallback) => {
    success({
      coords: {
        latitude: 0,
        longitude: 0,
      },
    } as any);
  },
};
