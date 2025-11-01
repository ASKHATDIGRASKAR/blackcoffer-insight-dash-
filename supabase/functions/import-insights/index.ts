import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: jsonData } = await req.json()
    
    if (!jsonData || !Array.isArray(jsonData)) {
      throw new Error('Invalid data format')
    }

    console.log(`Importing ${jsonData.length} records...`)

    // Transform and insert data in batches
    const batchSize = 100
    let imported = 0
    
    for (let i = 0; i < jsonData.length; i += batchSize) {
      const batch = jsonData.slice(i, i + batchSize).map((item: any) => ({
        end_year: item.end_year || null,
        intensity: item.intensity || null,
        sector: item.sector || null,
        topic: item.topic || null,
        insight: item.insight || null,
        url: item.url || null,
        region: item.region || null,
        start_year: item.start_year || null,
        impact: item.impact || null,
        added: item.added ? new Date(item.added).toISOString() : null,
        published: item.published ? new Date(item.published).toISOString() : null,
        country: item.country || null,
        relevance: item.relevance || null,
        pestle: item.pestle || null,
        source: item.source || null,
        title: item.title || null,
        likelihood: item.likelihood || null,
        city: item.city || null,
      }))

      const { error } = await supabase
        .from('insights')
        .insert(batch)

      if (error) {
        console.error('Batch insert error:', error)
        throw error
      }
      
      imported += batch.length
      console.log(`Imported ${imported}/${jsonData.length} records`)
    }

    return new Response(
      JSON.stringify({ success: true, imported }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Import error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})