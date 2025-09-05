import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, X, AlertTriangle } from "lucide-react";

interface PanicReport {
  id: number;
  user: {
    name: string;
    role: 'driver' | 'rider';
    phone: string;
    email: string;
  };
  location: string;
  latitude: number;
  longitude: number;
  description?: string;
  is_resolved: boolean;
  created_at: string;
  booking?: {
    id: number;
    source_name: string;
    destination_name: string;
    status: string;
    ride_fare: number;
  };
}

interface PanicMapProps {
  reports: PanicReport[];
  selectedReport?: PanicReport | null;
  onReportSelect?: (report: PanicReport) => void;
  onClose?: () => void;
}

const PanicMap = ({ reports, selectedReport, onReportSelect, onClose }: PanicMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    // Initialize map
    const map = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: { lat: 3.8480, lng: 11.5021 }, // Yaoundé, Cameroon coordinates
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        {
          featureType: "poi",
          elementType: "labels",
          stylers: [{ visibility: "off" }]
        }
      ]
    });

    mapInstanceRef.current = map;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add markers for each panic report
    reports.forEach((report) => {
      const marker = new google.maps.Marker({
        position: { lat: report.latitude, lng: report.longitude },
        map: map,
        title: `Panic Report #${report.id}`,
        icon: {
          url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="${report.is_resolved ? '#10B981' : '#EF4444'}" stroke="white" stroke-width="2"/>
              <path d="M16 8v8l4 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          `)}`,
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 250px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <div style="width: 8px; height: 8px; border-radius: 50%; background: ${report.is_resolved ? '#10B981' : '#EF4444'};"></div>
              <strong>Panic Report #${report.id}</strong>
            </div>
            <p style="margin: 4px 0; font-size: 14px;"><strong>User:</strong> ${report.user.name}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Role:</strong> ${report.user.role}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Phone:</strong> ${report.user.phone}</p>
            <p style="margin: 4px 0; font-size: 14px;"><strong>Status:</strong> ${report.is_resolved ? 'Resolved' : 'Unresolved'}</p>
            ${report.description ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Description:</strong> ${report.description}</p>` : ''}
            <p style="margin: 4px 0; font-size: 12px; color: #666;">${new Date(report.created_at).toLocaleString()}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
        if (onReportSelect) {
          onReportSelect(report);
        }
      });

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (reports.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      reports.forEach(report => {
        bounds.extend({ lat: report.latitude, lng: report.longitude });
      });
      map.fitBounds(bounds);
    }

  }, [reports, onReportSelect]);

  // Center map on selected report
  useEffect(() => {
    if (selectedReport && mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({
        lat: selectedReport.latitude,
        lng: selectedReport.longitude
      });
      mapInstanceRef.current.setZoom(15);
    }
  }, [selectedReport]);

  return (
    <div className="space-y-4">
      {/* Map Container */}
      <Card className="border-0 shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              Panic Locations Map
            </CardTitle>
            {onClose && (
              <Button variant="outline" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {reports.length} panic reports • {reports.filter(r => !r.is_resolved).length} unresolved
          </p>
        </CardHeader>
        <CardContent>
          <div 
            ref={mapRef} 
            className="w-full h-96 rounded-lg border-2 border-gray-200 dark:border-gray-700"
            style={{ minHeight: '400px' }}
          />
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span>Unresolved Reports</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Resolved Reports</span>
            </div>
            <div className="text-muted-foreground">
              Click markers for details
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Report Details */}
      {selectedReport && (
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg">
              <AlertTriangle className="w-5 h-5 text-blue-600" />
              Selected Report Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Report Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">ID:</span> #{selectedReport.id}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                      selectedReport.is_resolved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedReport.is_resolved ? 'Resolved' : 'Unresolved'}
                    </span>
                  </p>
                  <p><span className="font-medium">Reported:</span> {new Date(selectedReport.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">User Information</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedReport.user.name}</p>
                  <p><span className="font-medium">Role:</span> {selectedReport.user.role}</p>
                  <p><span className="font-medium">Phone:</span> {selectedReport.user.phone}</p>
                </div>
              </div>
            </div>
            {selectedReport.description && (
              <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Description</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  "{selectedReport.description}"
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PanicMap;
