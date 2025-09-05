import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  percentageChange: number;
  icon: React.ReactNode;
  color?: "blue" | "green" | "orange" | "red" | "purple";
  formatValue?: (value: number) => string;
}

export const BookingStatsCard = ({
  title,
  currentValue,
  previousValue,
  percentageChange,
  icon,
  color = "blue",
  formatValue = (value) => value.toLocaleString(),
}: StatsCardProps) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return {
          bg: "bg-green-50",
          icon: "text-green-600",
          value: "text-green-700",
          badge: percentageChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        };
      case "orange":
        return {
          bg: "bg-orange-50",
          icon: "text-orange-600",
          value: "text-orange-700",
          badge: percentageChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        };
      case "red":
        return {
          bg: "bg-red-50",
          icon: "text-red-600",
          value: "text-red-700",
          badge: percentageChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        };
      case "purple":
        return {
          bg: "bg-purple-50",
          icon: "text-purple-600",
          value: "text-purple-700",
          badge: percentageChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        };
      default:
        return {
          bg: "bg-blue-50",
          icon: "text-blue-600",
          value: "text-blue-700",
          badge: percentageChange >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800",
        };
    }
  };

  const colors = getColorClasses(color);
  const isPositive = percentageChange > 0;
  const isNegative = percentageChange < 0;
  const isNeutral = percentageChange === 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn("p-2 rounded-lg", colors.bg)}>
              <div className={cn("w-5 h-5", colors.icon)}>
                {icon}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className={cn("text-2xl font-bold", colors.value)}>
                {formatValue(currentValue)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="outline" className={cn("text-xs", colors.badge)}>
              <div className="flex items-center space-x-1">
                {isPositive && <TrendingUp className="w-3 h-3" />}
                {isNegative && <TrendingDown className="w-3 h-3" />}
                {isNeutral && <Minus className="w-3 h-3" />}
                <span>{Math.abs(percentageChange).toFixed(1)}%</span>
              </div>
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              vs last week: {formatValue(previousValue)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
