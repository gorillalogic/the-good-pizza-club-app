import { useEffect, useRef } from 'react';
import { MapOptions } from '../../../models/Map';
import styles from './Map.module.scss';

interface Props {
  options: MapOptions;
  className?: string;
  markers?: { lat: number; lng: number }[];
}

const Map: React.FC<Props> = ({ options, markers, className = '' }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const { Map } = google.maps;

    const map = new Map(mapRef.current, {
      center: {
        lat: options.lat,
        lng: options.lng,
      },
      zoom: options.zoom,
      zoomControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    });

    if (markers && markers.length) {
      markers.forEach((_marker) => {
        new google.maps.Marker({
          map,
          position: _marker,
        });
      });
    }
  }, [mapRef, options, markers]);

  return <div className={`${styles.map} ${className}`} ref={mapRef}></div>;
};

export default Map;
