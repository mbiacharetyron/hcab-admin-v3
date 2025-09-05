import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface PercentageCardProps {
  title: string;
  data: {
    completed: number;
    scheduled: number;
    cancelled: number;
  };
}

export const PercentageCard = ({ title, data }: PercentageCardProps) => {
  const total = data.completed + data.scheduled + data.cancelled;
  
  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-muted-foreground py-8">
            No data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Completed */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Completed</span>
            </div>
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              {data.completed.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={data.completed} className="h-2" />
        </div>

        {/* Scheduled */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-sm font-medium">Scheduled</span>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {data.scheduled.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={data.scheduled} className="h-2" />
        </div>

        {/* Cancelled */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Cancelled</span>
            </div>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {data.cancelled.toFixed(1)}%
            </Badge>
          </div>
          <Progress value={data.cancelled} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};
