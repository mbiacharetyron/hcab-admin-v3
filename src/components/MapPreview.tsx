import React, { useEffect, useRef } from 'react';
import { PanicReport } from '@/lib/api';

interface MapPreviewProps {
  report: PanicReport;
  isVisible: boolean;
  position: { x: number; y: number };
}

const MapPreview: React.FC<MapPreviewProps> = ({ report, isVisible, position }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);

  useEffect(() => {
    if (isVisible && mapRef.current && window.google) {
      // Initialize small preview map
      const map = new google.maps.Map(mapRef.current, {
        zoom: 14,
        center: {
          lat: report.latitude,
          lng: report.longitude
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        draggable: false
      });

      mapInstanceRef.current = map;

      // Create custom marker
      const marker = new google.maps.Marker({
        position: {
          lat: report.latitude,
          lng: report.longitude
        },
        map: map,
        title: `Panic Report #${report.id}`,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
              <path d="M12 4 L16 12 L12 20 L8 12 Z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 12)
        }
      });

      markerRef.current = marker;
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [isVisible, report]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed z-50 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        width: '300px',
        height: '200px'
      }}
    >
      <div className="p-2 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
            Panic Report #{report.id}
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {report.location}
        </p>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ height: '160px' }}
      />
    </div>
  );
};

export default MapPreview;
