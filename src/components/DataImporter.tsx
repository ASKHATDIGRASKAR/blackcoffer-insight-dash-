import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Upload, Database } from "lucide-react";
import jsonData from "@/data/jsondata.json";

export const DataImporter = () => {
  const [importing, setImporting] = useState(false);
  const [dataCount, setDataCount] = useState<number | null>(null);

  const checkDataExists = async () => {
    const { count } = await supabase
      .from('insights')
      .select('*', { count: 'exact', head: true });
    
    setDataCount(count || 0);
  };

  const importData = async () => {
    setImporting(true);
    try {
      const { data, error } = await supabase.functions.invoke('import-insights', {
        body: { data: jsonData },
      });

      if (error) throw error;

      toast.success(`Successfully imported ${data.imported} records!`);
      await checkDataExists();
    } catch (error: any) {
      toast.error(`Import failed: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Import
        </CardTitle>
        <CardDescription>
          Import the insights data into the database to start visualizing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            onClick={importData} 
            disabled={importing}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {importing ? "Importing..." : "Import Data"}
          </Button>
          <Button 
            onClick={checkDataExists} 
            variant="outline"
          >
            Check Records
          </Button>
          {dataCount !== null && (
            <span className="text-sm text-muted-foreground">
              {dataCount} records in database
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};