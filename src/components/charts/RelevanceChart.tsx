import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { InsightData } from "@/hooks/useInsightsData";

interface RelevanceChartProps {
  data: InsightData[];
}

export const RelevanceChart = ({ data }: RelevanceChartProps) => {
  const chartData = data
    .filter(d => d.topic && d.relevance && d.likelihood)
    .reduce((acc, curr) => {
      const existing = acc.find(item => item.topic === curr.topic);
      if (existing) {
        existing.avgRelevance = (existing.avgRelevance * existing.count + (curr.relevance || 0)) / (existing.count + 1);
        existing.avgLikelihood = (existing.avgLikelihood * existing.count + (curr.likelihood || 0)) / (existing.count + 1);
        existing.count += 1;
      } else {
        acc.push({
          topic: curr.topic!,
          avgRelevance: curr.relevance || 0,
          avgLikelihood: curr.likelihood || 0,
          count: 1,
        });
      }
      return acc;
    }, [] as { topic: string; avgRelevance: number; avgLikelihood: number; count: number }[])
    .sort((a, b) => b.avgRelevance - a.avgRelevance)
    .slice(0, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Relevance & Likelihood by Topic</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="topic" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="avgRelevance" stroke="hsl(var(--primary))" name="Avg Relevance" />
            <Line type="monotone" dataKey="avgLikelihood" stroke="hsl(var(--accent))" name="Avg Likelihood" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};