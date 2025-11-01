import { useState } from "react";
import { DataImporter } from "@/components/DataImporter";
import { DashboardFilters } from "@/components/DashboardFilters";
import { useInsightsData, FilterOptions } from "@/hooks/useInsightsData";
import { IntensityChart } from "@/components/charts/IntensityChart";
import { RelevanceChart } from "@/components/charts/RelevanceChart";
import { RegionChart } from "@/components/charts/RegionChart";
import { StatsCards } from "@/components/charts/StatsCards";
import { BarChart3 } from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const { data: insights, isLoading } = useInsightsData(filters);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <BarChart3 className="h-10 w-10" />
            Blackcoffer Insights Dashboard
          </h1>
          <p className="text-muted-foreground">
            Data visualization and analytics platform
          </p>
        </div>

        <DataImporter />
        
        <DashboardFilters filters={filters} onFilterChange={setFilters} />

        {isLoading ? (
          <div className="text-center py-12">Loading insights...</div>
        ) : insights && insights.length > 0 ? (
          <>
            <StatsCards data={insights} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <IntensityChart data={insights} />
              <RelevanceChart data={insights} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RegionChart data={insights} />
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No data available. Please import the data first.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
