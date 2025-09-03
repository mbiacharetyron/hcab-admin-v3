import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  variant?: "blue" | "green" | "orange" | "purple" | "red" | "teal";
  className?: string;
  isLoading?: boolean;
}

const variantStyles = {
  blue: "bg-gradient-primary text-primary-foreground",
  green: "bg-gradient-success text-success-foreground", 
  orange: "bg-gradient-warning text-warning-foreground",
  purple: "bg-gradient-purple text-primary-foreground",
  red: "bg-stats-red text-destructive-foreground",
  teal: "bg-stats-teal text-primary-foreground"
};

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType = "neutral", 
  variant = "blue",
  className,
  isLoading = false
}: StatsCardProps) => {
  if (isLoading) {
    return (
      <Card className={cn("shadow-medium", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-16" />
              {change && <Skeleton className="h-3 w-32" />}
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-medium hover:shadow-large transition-shadow", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <p className={cn(
                "text-xs font-medium",
                changeType === "positive" && "text-success",
                changeType === "negative" && "text-destructive", 
                changeType === "neutral" && "text-muted-foreground"
              )}>
                {change}
              </p>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center shadow-soft",
            variantStyles[variant]
          )}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};