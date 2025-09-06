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
  blue: "bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white shadow-blue-500/25",
  green: "bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-emerald-500/25", 
  orange: "bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white shadow-orange-500/25",
  purple: "bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 text-white shadow-purple-500/25",
  red: "bg-gradient-to-br from-red-500 via-red-600 to-red-700 text-white shadow-red-500/25",
  teal: "bg-gradient-to-br from-teal-500 via-teal-600 to-teal-700 text-white shadow-teal-500/25"
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
      <Card className={cn("shadow-medium hover:shadow-large transition-all duration-300 group", className)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-3 flex-1">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-10 w-20 rounded-lg" />
              {change && <Skeleton className="h-3 w-36 rounded-full" />}
            </div>
            <Skeleton className="w-14 h-14 rounded-2xl" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn(
      "group relative overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20 shadow-medium hover:shadow-large transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1", 
      className
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <CardContent className="relative p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-bold text-foreground group-hover:scale-105 transition-transform duration-300">{value}</p>
            {change && (
              <div className="flex items-center space-x-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  changeType === "positive" && "bg-success animate-pulse",
                  changeType === "negative" && "bg-destructive animate-pulse", 
                  changeType === "neutral" && "bg-muted-foreground"
                )}></div>
                <p className={cn(
                  "text-sm font-medium",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-destructive", 
                  changeType === "neutral" && "text-muted-foreground"
                )}>
                  {change}
                </p>
              </div>
            )}
          </div>
          <div className={cn(
            "w-16 h-16 rounded-2xl flex items-center justify-center shadow-large group-hover:scale-110 group-hover:rotate-3 transition-all duration-300",
            variantStyles[variant]
          )}>
            <div className="group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};