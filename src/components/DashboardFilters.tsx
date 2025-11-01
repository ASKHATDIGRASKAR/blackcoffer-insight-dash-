import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useFilterOptions, FilterOptions } from "@/hooks/useInsightsData";
import { Button } from "@/components/ui/button";

interface DashboardFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const DashboardFilters = ({ filters, onFilterChange }: DashboardFiltersProps) => {
  const { data: options, isLoading } = useFilterOptions();

  if (isLoading) return <div>Loading filters...</div>;

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">End Year</label>
            <Select
              value={filters.endYear || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, endYear: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {options?.endYears.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Sector</label>
            <Select
              value={filters.sector || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, sector: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Sectors" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {options?.sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Region</label>
            <Select
              value={filters.region || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, region: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Regions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                {options?.regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">PEST</label>
            <Select
              value={filters.pestle || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, pestle: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All PEST" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All PEST</SelectItem>
                {options?.pestles.map((pestle) => (
                  <SelectItem key={pestle} value={pestle}>
                    {pestle}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Source</label>
            <Select
              value={filters.source || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, source: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Sources" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                {options?.sources.map((source) => (
                  <SelectItem key={source} value={source}>
                    {source}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Country</label>
            <Select
              value={filters.country || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, country: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Countries</SelectItem>
                {options?.countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">City</label>
            <Select
              value={filters.city || "all"}
              onValueChange={(value) => onFilterChange({ ...filters, city: value === "all" ? undefined : value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {options?.cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};