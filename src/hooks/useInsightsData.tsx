import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface InsightData {
  id: string;
  end_year: string | null;
  intensity: number | null;
  sector: string | null;
  topic: string | null;
  insight: string | null;
  url: string | null;
  region: string | null;
  start_year: string | null;
  impact: string | null;
  added: string | null;
  published: string | null;
  country: string | null;
  relevance: number | null;
  pestle: string | null;
  source: string | null;
  title: string | null;
  likelihood: number | null;
  city: string | null;
}

export interface FilterOptions {
  endYear?: string;
  topics?: string[];
  sector?: string;
  region?: string;
  pestle?: string;
  source?: string;
  country?: string;
  city?: string;
}

export const useInsightsData = (filters: FilterOptions = {}) => {
  return useQuery({
    queryKey: ['insights', filters],
    queryFn: async () => {
      let query = supabase
        .from('insights')
        .select('*');

      if (filters.endYear) {
        query = query.eq('end_year', filters.endYear);
      }
      if (filters.topics && filters.topics.length > 0) {
        query = query.in('topic', filters.topics);
      }
      if (filters.sector) {
        query = query.eq('sector', filters.sector);
      }
      if (filters.region) {
        query = query.eq('region', filters.region);
      }
      if (filters.pestle) {
        query = query.eq('pestle', filters.pestle);
      }
      if (filters.source) {
        query = query.eq('source', filters.source);
      }
      if (filters.country) {
        query = query.eq('country', filters.country);
      }
      if (filters.city) {
        query = query.eq('city', filters.city);
      }

      const { data, error } = await query;
      
      if (error) throw error;
      return data as InsightData[];
    },
  });
};

export const useFilterOptions = () => {
  return useQuery({
    queryKey: ['filter-options'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('insights')
        .select('end_year, topic, sector, region, pestle, source, country, city');
      
      if (error) throw error;

      const uniqueValues = {
        endYears: [...new Set(data.map(d => d.end_year).filter(Boolean))].sort(),
        topics: [...new Set(data.map(d => d.topic).filter(Boolean))].sort(),
        sectors: [...new Set(data.map(d => d.sector).filter(Boolean))].sort(),
        regions: [...new Set(data.map(d => d.region).filter(Boolean))].sort(),
        pestles: [...new Set(data.map(d => d.pestle).filter(Boolean))].sort(),
        sources: [...new Set(data.map(d => d.source).filter(Boolean))].sort(),
        countries: [...new Set(data.map(d => d.country).filter(Boolean))].sort(),
        cities: [...new Set(data.map(d => d.city).filter(Boolean))].sort(),
      };

      return uniqueValues;
    },
  });
};