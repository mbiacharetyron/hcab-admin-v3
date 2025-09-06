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
    <Card className="shadow-large bg-white/80 backdrop-blur-sm border border-white/20 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5">
        <CardTitle className="text-xl font-bold flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-medium">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-foreground">Live Map</span>
              <p className="text-sm text-muted-foreground font-normal">Real-time driver and ride locations</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-success-light rounded-full">
              <Users className="w-4 h-4 text-success" />
              <span className="text-success font-medium text-sm">Online: {onlineDrivers}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-primary-light rounded-full">
              <Car className="w-4 h-4 text-primary" />
              <span className="text-primary font-medium text-sm">Active: {activeTrips}</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-96 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"></div>
          <div className="relative h-full">
            <GoogleMap
              onlineDrivers={onlineDrivers}
              activeTrips={activeTrips}
              driverLocations={driverLocations}
              rideLocations={rideLocations}
            />
          </div>
        </div>
        
        {/* Enhanced Map Controls */}
        <div className="p-6 bg-gradient-to-r from-slate-50/50 via-transparent to-slate-50/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse shadow-sm"></div>
                <span className="text-sm font-medium text-foreground">Drivers ({driverLocations.length})</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-sm"></div>
                <span className="text-sm font-medium text-foreground">Rides ({rideLocations.length})</span>
              </div>
              {onRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onRefresh}
                  className="ml-4 hover:scale-105 transition-all duration-300 border-primary/20 hover:border-primary/40"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Map
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>Last updated: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

