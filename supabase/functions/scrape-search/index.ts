
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // Fetch search results
    const searchUrl = `https://new3.scloud.ninja/?search=${encodeURIComponent(query)}`
    const response = await fetch(searchUrl)
    const html = await response.text()
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    
    if (!doc) {
      throw new Error('Failed to parse HTML')
    }

    // Extract search results
    const results = []
    const resultElements = doc.querySelectorAll('.file-row')
    
    for (const element of resultElements) {
      const titleElement = element.querySelector('.file-name')
      const sizeElement = element.querySelector('.file-size')
      const idMatch = element.querySelector('a')?.href?.match(/\/file\/([^/]+)/)
      
      if (titleElement && idMatch) {
        results.push({
          title: titleElement.textContent?.trim(),
          size: sizeElement?.textContent?.trim(),
          fileId: idMatch[1],
        })
      }
    }

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Scraping error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to fetch search results' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
