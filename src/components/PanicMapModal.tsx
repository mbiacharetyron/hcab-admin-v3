import React, { useEffect, useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  X, 
  MapPin, 
  User, 
  Phone, 
  Calendar, 
  AlertTriangle,
  Car,
  Clock,
  Navigation,
  ExternalLink,
  Copy,
  Share2,
  ZoomIn,
  ZoomOut,
  Layers,
  Maximize2,
  Minimize2,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PanicReport } from '@/lib/api';

interface PanicMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: PanicReport | null;
}

const PanicMapModal: React.FC<PanicMapModalProps> = ({ isOpen, onClose, report }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapType, setMapType] = useState<google.maps.MapTypeId>(google.maps.MapTypeId.ROADMAP);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && report && mapRef.current && window.google) {
      setIsLoading(true);
      
      // Initialize map with enhanced styling
      const map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        center: {
          lat: report.latitude,
          lng: report.longitude
        },
        mapTypeId: mapType,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          },
          {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [{ color: '#f5f5f5' }, { lightness: 20 }]
          }
        ],
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        zoomControl: false
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
            <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="20" cy="20" r="18" fill="#ef4444" stroke="#ffffff" stroke-width="3"/>
              <path d="M20 8 L26 20 L20 32 L14 20 Z" fill="#ffffff"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(40, 40),
          anchor: new google.maps.Point(20, 20)
        },
        animation: google.maps.Animation.BOUNCE
      });

      markerRef.current = marker;

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; font-family: system-ui;">
            <h3 style="margin: 0 0 8px 0; color: #ef4444; font-weight: bold;">
              🚨 Panic Report #${report.id}
            </h3>
            <p style="margin: 4px 0; color: #374151;">
              <strong>User:</strong> ${report.user.name}
            </p>
            <p style="margin: 4px 0; color: #374151;">
              <strong>Role:</strong> ${report.user.role}
            </p>
            <p style="margin: 4px 0; color: #374151;">
              <strong>Status:</strong> ${report.is_resolved ? '✅ Resolved' : '⚠️ Unresolved'}
            </p>
            <p style="margin: 4px 0; color: #6b7280; font-size: 12px;">
              ${format(new Date(report.created_at), "MMM dd, yyyy 'at' HH:mm")}
            </p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Open info window by default
      setTimeout(() => {
        infoWindow.open(map, marker);
      }, 500);

      // Stop bounce animation after 2 seconds
      setTimeout(() => {
        marker.setAnimation(null);
      }, 2000);

      // Map loaded event
      google.maps.event.addListenerOnce(map, 'idle', () => {
        setIsLoading(false);
      });
    }

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, [isOpen, report, mapType]);

  // Map control functions
  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      const currentZoom = mapInstanceRef.current.getZoom();
      mapInstanceRef.current.setZoom(currentZoom - 1);
    }
  };

  const handleMapTypeChange = () => {
    const newMapType = mapType === google.maps.MapTypeId.ROADMAP 
      ? google.maps.MapTypeId.SATELLITE 
      : google.maps.MapTypeId.ROADMAP;
    setMapType(newMapType);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setMapTypeId(newMapType);
    }
  };

  const handleCopyCoordinates = async () => {
    if (report) {
      const coordinates = `${report.latitude}, ${report.longitude}`;
      try {
        await navigator.clipboard.writeText(coordinates);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy coordinates:', err);
      }
    }
  };

  const handleShareLocation = async () => {
    if (report && navigator.share) {
      try {
        await navigator.share({
          title: `Panic Report #${report.id} Location`,
          text: `Panic report location: ${report.location}`,
          url: `https://www.google.com/maps?q=${report.latitude},${report.longitude}`
        });
      } catch (err) {
        console.error('Failed to share location:', err);
      }
    }
  };

  if (!report) return null;

  const getStatusBadge = (isResolved: boolean) => {
    if (isResolved) {
      return (
        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-700">
          ✅ Resolved
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-700 animate-pulse">
          ⚠️ Unresolved
        </Badge>
      );
    }
  };

  const getUserTypeBadge = (role: 'driver' | 'rider') => {
    if (role === 'driver') {
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-700">
          <Car className="w-3 h-3 mr-1" />
          Driver
        </Badge>
      );
    } else {
      return (
        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-700">
          <User className="w-3 h-3 mr-1" />
          Rider
        </Badge>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={cn(
        "p-0 overflow-hidden transition-all duration-300",
        isFullscreen ? "max-w-[100vw] max-h-[100vh] w-screen h-screen" : "max-w-6xl max-h-[90vh]"
      )}>
        <div className="flex h-full">
          {/* Map Section */}
          <div className="flex-1 relative">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-20 flex items-center justify-center">
                <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-200 dark:border-gray-700">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Loading map...</span>
                </div>
              </div>
            )}

            {/* Header Info */}
            <div className="absolute top-4 left-4 z-10">
              <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg p-3 border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">
                      Panic Report #{report.id}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {report.user.name} • {report.user.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
              {/* Fullscreen Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </Button>
              
              {/* Close Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Map Type and Zoom Controls */}
            <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
              {/* Map Type Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleMapTypeChange}
                className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                title="Switch map type"
              >
                <Layers className="w-4 h-4" />
              </Button>
              
              {/* Zoom Controls */}
              <div className="flex flex-col gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomIn}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleZoomOut}
                  className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md hover:bg-gray-50 dark:hover:bg-gray-800 shadow-lg border border-gray-200/50 dark:border-gray-700/50"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div 
              ref={mapRef} 
              className="w-full h-full min-h-[500px]"
              style={{ minHeight: '500px' }}
            />
          </div>

          {/* Details Panel */}
          <div className="w-96 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Report Details
                  </h2>
                  {getStatusBadge(report.is_resolved)}
                </div>
                <div className="flex items-center gap-2">
                  {getUserTypeBadge(report.user.role)}
                </div>
              </div>

              {/* User Information */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Name:</span>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{report.user.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-gray-500" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Phone:</span>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{report.user.phone}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Email:</span>
                      <p className="text-gray-600 dark:text-gray-400 text-xs">{report.user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Information */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Location Details
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Address:</span>
                      <p className="text-gray-800 dark:text-gray-200 font-medium">{report.location}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Coordinates:</span>
                      <p className="text-gray-600 dark:text-gray-400 font-mono text-xs">
                        {report.latitude.toFixed(6)}, {report.longitude.toFixed(6)}
                      </p>
                    </div>
                    {report.description && (
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Description:</span>
                        <p className="text-gray-600 dark:text-gray-400 italic text-xs">
                          "{report.description}"
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Timestamp */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <CardContent className="p-4">
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Report Time
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">Reported:</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {format(new Date(report.created_at), "EEEE, MMMM dd, yyyy")}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      {format(new Date(report.created_at), "HH:mm:ss")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Information */}
              {report.booking && (
                <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                  <CardContent className="p-4">
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      Associated Booking
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Booking ID:</span>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">#{report.booking.id}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{report.booking.status}</p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Route:</span>
                        <p className="text-gray-600 dark:text-gray-400 text-xs">
                          {report.booking.source_name} → {report.booking.destination_name}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700 dark:text-gray-300">Fare:</span>
                        <p className="text-gray-800 dark:text-gray-200 font-medium">{report.booking.ride_fare} XAF</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg"
                  onClick={() => {
                    const url = `https://www.google.com/maps?q=${report.latitude},${report.longitude}`;
                    window.open(url, '_blank');
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition((position) => {
                        const url = `https://www.google.com/maps/dir/${position.coords.latitude},${position.coords.longitude}/${report.latitude},${report.longitude}`;
                        window.open(url, '_blank');
                      });
                    }
                  }}
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Get Directions
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyCoordinates}
                    className="border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4 mr-1 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 mr-1" />
                    )}
                    {copied ? 'Copied!' : 'Copy Coords'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShareLocation}
                    className="border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PanicMapModal;
