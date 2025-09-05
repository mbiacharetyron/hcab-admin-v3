import React, { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import carIcon from '@/assets/icons/cars/locator_car.png';

interface GoogleMapProps {
  center?: google.maps.LatLngLiteral;
  zoom?: number;
  onlineDrivers?: number;
  activeTrips?: number;
  driverLocations?: Array<{
    id: number;
    name: string;
    lat: number;
    lng: number;
    isOnline: boolean;
  }>;
  rideLocations?: Array<{
    id: number;
    riderId: number;
    pickup: { lat: number; lng: number };
    destination: { lat: number; lng: number };
    status: string;
  }>;
}

const MapComponent: React.FC<{
  center: google.maps.LatLngLiteral;
  zoom: number;
  driverLocations?: GoogleMapProps['driverLocations'];
  rideLocations?: GoogleMapProps['rideLocations'];
}> = ({ center, zoom, driverLocations = [], rideLocations = [] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();
  const [driverMarkers, setDriverMarkers] = useState<google.maps.Marker[]>([]);
  const [rideMarkers, setRideMarkers] = useState<google.maps.Marker[]>([]);

  useEffect(() => {
    if (ref.current && !map) {
      const newMap = new window.google.maps.Map(ref.current, {
        center,
        zoom,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true,
      });
      setMap(newMap);
    }
  }, [ref, map, center, zoom]);

  // Update driver markers
  useEffect(() => {
    if (!map) return;

    // Clear existing driver markers
    driverMarkers.forEach(marker => marker.setMap(null));

    const newDriverMarkers = driverLocations
      .filter(driver => driver.lat && driver.lng) // Only show drivers with valid coordinates
      .map(driver => {
        const marker = new google.maps.Marker({
          position: { lat: driver.lat, lng: driver.lng },
          map,
          title: driver.name,
          icon: {
            url: carIcon,
            scaledSize: new google.maps.Size(32, 32), // Resize the icon
            anchor: new google.maps.Point(16, 16), // Center the icon on the position
          },
          animation: driver.isOnline ? google.maps.Animation.BOUNCE : undefined,
        });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">${driver.name}</h3>
            <p class="text-xs text-gray-600">Driver ID: ${driver.id}</p>
            <p class="text-xs ${driver.isOnline ? 'text-green-600' : 'text-gray-500'}">
              ${driver.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      return marker;
    });

    setDriverMarkers(newDriverMarkers);
  }, [map, driverLocations]);

  // Update ride markers
  useEffect(() => {
    if (!map) return;

    // Clear existing ride markers
    rideMarkers.forEach(marker => marker.setMap(null));

    const newRideMarkers = rideLocations.map(ride => {
      // Pickup marker
      const pickupMarker = new google.maps.Marker({
        position: ride.pickup,
        map,
        title: `Ride ${ride.id} - Pickup`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#3B82F6',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
      });

      // Destination marker
      const destinationMarker = new google.maps.Marker({
        position: ride.destination,
        map,
        title: `Ride ${ride.id} - Destination`,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          fillColor: '#EF4444',
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
        },
      });

      // Draw route line
      const routeLine = new google.maps.Polyline({
        path: [ride.pickup, ride.destination],
        geodesic: true,
        strokeColor: '#3B82F6',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        map,
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold text-sm">Ride ${ride.id}</h3>
            <p class="text-xs text-gray-600">Rider ID: ${ride.riderId}</p>
            <p class="text-xs ${ride.status === 'completed' ? 'text-green-600' : ride.status === 'cancelled' ? 'text-red-600' : 'text-blue-600'}">
              Status: ${ride.status}
            </p>
          </div>
        `,
      });

      pickupMarker.addListener('click', () => {
        infoWindow.open(map, pickupMarker);
      });

      return { pickupMarker, destinationMarker, routeLine };
    });

    setRideMarkers(newRideMarkers.flatMap(ride => [ride.pickupMarker, ride.destinationMarker]));
  }, [map, rideLocations]);

  return <div ref={ref} className="w-full h-full rounded-lg" />;
};

const render = (status: Status) => {
  switch (status) {
    case Status.LOADING:
      return (
        <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-blue-700">Loading Google Maps...</p>
          </div>
        </div>
      );
    case Status.FAILURE:
      return (
        <div className="h-96 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-2 border-dashed border-red-200 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-600 mb-4">⚠️</div>
            <p className="text-red-700">Failed to load Google Maps</p>
            <p className="text-red-600 text-sm">Please check your API key configuration</p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export const GoogleMap: React.FC<GoogleMapProps> = ({
  center = { lat: 4.0483, lng: 9.7043 }, // Douala, Cameroon coordinates
  zoom = 12,
  onlineDrivers = 0,
  activeTrips = 0,
  driverLocations = [],
  rideLocations = [],
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="h-96 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-2 border-dashed border-yellow-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-yellow-600 mb-4">🔑</div>
          <p className="text-yellow-700">Google Maps API Key Required</p>
          <p className="text-yellow-600 text-sm">Please add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
        </div>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MapComponent
        center={center}
        zoom={zoom}
        driverLocations={driverLocations}
        rideLocations={rideLocations}
      />
    </Wrapper>
  );
};
