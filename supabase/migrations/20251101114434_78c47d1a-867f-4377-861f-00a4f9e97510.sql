-- Create insights table to store the visualization data
CREATE TABLE public.insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  end_year TEXT,
  intensity INTEGER,
  sector TEXT,
  topic TEXT,
  insight TEXT,
  url TEXT,
  region TEXT,
  start_year TEXT,
  impact TEXT,
  added TIMESTAMP WITH TIME ZONE,
  published TIMESTAMP WITH TIME ZONE,
  country TEXT,
  relevance INTEGER,
  pestle TEXT,
  source TEXT,
  title TEXT,
  likelihood INTEGER,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance on filter fields
CREATE INDEX idx_insights_end_year ON public.insights(end_year);
CREATE INDEX idx_insights_topic ON public.insights(topic);
CREATE INDEX idx_insights_sector ON public.insights(sector);
CREATE INDEX idx_insights_region ON public.insights(region);
CREATE INDEX idx_insights_pestle ON public.insights(pestle);
CREATE INDEX idx_insights_source ON public.insights(source);
CREATE INDEX idx_insights_country ON public.insights(country);
CREATE INDEX idx_insights_city ON public.insights(city);

-- Enable Row Level Security
ALTER TABLE public.insights ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access (since this is a public dashboard)
CREATE POLICY "Allow public read access to insights" 
ON public.insights 
FOR SELECT 
USING (true);