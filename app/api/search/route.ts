// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/lib/search/searchService';
import { validateSearchConfig } from '@/lib/search/config';
import { createClient } from '@supabase/supabase-js';

// Runs on Vercel Edge Network
export const runtime = 'edge';

// Validate config on startup
validateSearchConfig();

// When you need user accounts:
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q');
    const engine = searchParams.get('engine');
    const numResults = parseInt(searchParams.get('num') || '10');
    const allEngines = searchParams.get('all') === 'true';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter "q" is required' },
        { status: 400 }
      );
    }

    let results;
    let sources: string[] = [];

    if (allEngines) {
      // Fetch from all sources in parallel
      sources = ['congress', 'govinfo', 'federal']; // Example sources
      const promises = sources.map(source =>
        searchService.search({ query, engine: source, numResults }).catch(() => [])
      );
      const promiseResults = await Promise.all(promises);
      results = promiseResults.flat();
    } else {
      const source = engine || 'google';
      sources = [source];
      results = await searchService.search({
        query,
        engine: source,
        numResults,
      });
    }

    /*
    // Alternative fetch strategy: Primary with fallbacks
    const primary = 'congress';
    const fallbacks = ['govinfo', 'federal'];
    let fallbackResults = [];
    sources = [primary, ...fallbacks];
    for (const source of sources) {
        try {
            fallbackResults = await searchService.search({query, engine: source, numResults});
            if (fallbackResults.length > 0) break;
        } catch (error) {
            continue;
        }
    }
    results = fallbackResults;
    */

    const resultsArray = Array.isArray(results) ? results : [results];

    // Store user search history
    // TODO: get userId from session/auth
    const userId = 'user-placeholder';
    if (userId) {
        await supabase.from('search_history').insert({
          user_id: userId,
          query,
          sources,
          results_count: resultsArray.length,
        });
    }

    const response = NextResponse.json({
      query,
      engine: allEngines ? 'all' : (engine || 'google'),
      count: resultsArray.length,
      results: resultsArray,
      timestamp: new Date().toISOString(),
    });

    // Cache for 5 minutes on CDN
    response.headers.set('Cache-Control', 'public, s-maxage=300');
    
    return response;

    /*
    // Alternative: Return partial results immediately via streaming
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        // Send first source results immediately
        const congressResults = await searchService.search({query, engine: 'congress', numResults});
        controller.enqueue(encoder.encode(JSON.stringify({
          type: 'partial',
          source: 'congress',
          results: congressResults
        })));
        
        // Send other sources as they come
        const otherSources = ['govinfo', 'federal'];
        const promises = otherSources.map(source => searchService.search({query, engine: source, numResults}));
        const otherResults = await Promise.all(promises);
        
        controller.enqueue(encoder.encode(JSON.stringify({
          type: 'complete',
          results: otherResults.flat()
        })));
        
        controller.close();
      }
    });
    return new Response(stream, { headers: { 'Content-Type': 'application/json' } });
    */

  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.', message: error.message },
      { status: 500 }
    );
  }
}
