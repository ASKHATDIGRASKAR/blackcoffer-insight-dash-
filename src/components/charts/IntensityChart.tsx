import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { InsightData } from "@/hooks/useInsightsData";

interface IntensityChartProps {
  data: InsightData[];
}

export const IntensityChart = ({ data }: IntensityChartProps) => {
  const chartData = data
    .filter(d => d.sector && d.intensity)
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.sector === curr.sector);
      if (existing) {
        existing.avgIntensity = (existing.avgIntensity * existing.count + (curr.intensity || 0)) / (existing.count + 1);
        existing.count += 1;
      } else {
        acc.push({
          sector: curr.sector!,
          avgIntensity: curr.intensity || 0,
          count: 1,
        });
      }
      return acc;
    }, [] as { sector: string; avgIntensity: number; count: number }[])
    .sort((a, b) => b.avgIntensity - a.avgIntensity)
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Intensity by Sector</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="sector" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgIntensity" fill="hsl(var(--primary))" name="Avg Intensity" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};