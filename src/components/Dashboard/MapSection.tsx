import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Car, Users, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GoogleMap } from "./GoogleMap";

interface MapSectionProps {
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
  onRefresh?: () => void;
}

export const MapSection = ({ 
  onlineDrivers = 0, 
  activeTrips = 0, 
  driverLocations = [],
  rideLocations = [],
  onRefresh 
}: MapSectionProps) => {
  return (
    <Card className="shadow-medium">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>Live Map</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-muted-foreground">Online:</span>
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                {onlineDrivers}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Car className="w-4 h-4 text-blue-600" />
              <span className="text-muted-foreground">Active:</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {activeTrips}
              </Badge>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96 rounded-lg border border-gray-200 overflow-hidden">
          <GoogleMap
            onlineDrivers={onlineDrivers}
            activeTrips={activeTrips}
            driverLocations={driverLocations}
            rideLocations={rideLocations}
          />
        </div>
        
        {/* Map Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Drivers ({driverLocations.filter(d => d.isOnline).length})</span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Rides ({rideLocations.length})</span>
            </div>
            {onRefresh && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRefresh}
                className="ml-4"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Map
              </Button>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

