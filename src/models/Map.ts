export interface Location {
  lat: number;
  lng: number;
}

export interface MapOptions extends Location {
  zoom: number;
}
