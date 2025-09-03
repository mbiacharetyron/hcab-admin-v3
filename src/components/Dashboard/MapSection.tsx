import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Navigation, Car, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MapSectionProps {
  onlineDrivers?: number;
  activeTrips?: number;
}

export const MapSection = ({ onlineDrivers = 0, activeTrips = 0 }: MapSectionProps) => {
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
        <div className="h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg border-2 border-dashed border-blue-200 flex items-center justify-center relative overflow-hidden">
          {/* Map Placeholder */}
          <div className="text-center z-10">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-400" />
            <h3 className="text-xl font-semibold text-blue-900 mb-2">Interactive Map</h3>
            <p className="text-blue-700 mb-4">Real-time driver and ride tracking</p>
            <div className="flex items-center justify-center space-x-4 text-sm text-blue-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Drivers</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Rides</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span>Alerts</span>
              </div>
            </div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-red-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}></div>
          </div>
        </div>
        
        {/* Map Controls */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <Navigation className="w-4 h-4 text-blue-600" />
            </button>
            <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <Car className="w-4 h-4 text-green-600" />
            </button>
            <button className="p-2 rounded-lg bg-red-50 hover:bg-red-100 transition-colors">
              <MapPin className="w-4 h-4 text-red-600" />
            </button>
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

