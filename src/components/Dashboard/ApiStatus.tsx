import { CheckCircle, XCircle, Clock, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

interface ApiStatusProps {
  isConnected: boolean;
  isLoading: boolean;
  lastUpdated?: Date;
  error?: string;
  fallbackMode?: boolean;
}

export const ApiStatus = ({ isConnected, isLoading, lastUpdated, error, fallbackMode }: ApiStatusProps) => {
  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Clock className="w-4 h-4 animate-spin" />
        <span>Connecting to API...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center space-x-2 text-sm text-destructive">
        <XCircle className="w-4 h-4" />
        <span>API Error: {error}</span>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2 text-sm text-success">
        <CheckCircle className="w-4 h-4" />
        <span>Connected to API</span>
        {lastUpdated && (
          <span className="text-muted-foreground">
            • Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
        )}
      </div>
    );
  }

  if (fallbackMode) {
    return (
      <div className="flex items-center space-x-2 text-sm text-orange-600">
        <Wifi className="w-4 h-4" />
        <span>Using Fallback Data</span>
        <span className="text-muted-foreground">
          • API connection failed
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
      <Wifi className="w-4 h-4" />
      <span>Disconnected</span>
    </div>
  );
};
