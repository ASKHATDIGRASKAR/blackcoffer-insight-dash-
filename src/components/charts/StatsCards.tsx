import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InsightData } from "@/hooks/useInsightsData";
import { BarChart3, TrendingUp, Globe, Zap } from "lucide-react";

interface StatsCardsProps {
  data: InsightData[];
}

export const StatsCards = ({ data }: StatsCardsProps) => {
  const avgIntensity = data.reduce((acc, curr) => acc + (curr.intensity || 0), 0) / data.length;
  const avgRelevance = data.reduce((acc, curr) => acc + (curr.relevance || 0), 0) / data.length;
  const avgLikelihood = data.reduce((acc, curr) => acc + (curr.likelihood || 0), 0) / data.length;
  const uniqueCountries = new Set(data.filter(d => d.country).map(d => d.country)).size;

  const stats = [
    {
      title: "Total Insights",
      value: data.length.toLocaleString(),
      icon: BarChart3,
      color: "text-blue-500",
    },
    {
      title: "Avg Intensity",
      value: avgIntensity.toFixed(1),
      icon: Zap,
      color: "text-orange-500",
    },
    {
      title: "Avg Relevance",
      value: avgRelevance.toFixed(1),
      icon: TrendingUp,
      color: "text-green-500",
    },
    {
      title: "Countries",
      value: uniqueCountries.toString(),
      icon: Globe,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};