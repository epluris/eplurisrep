// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/lib/search/searchService';
import { validateSearchConfig } from '@/lib/search/config';
import { createClient } from '@supabase/supabase-js';

// Runs on Vercel Edge Network
export const runtime = 'edge';

// Validate config on startup
validateSearchConfig();

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
    let sources: string[];

    if (allEngines) {
      results = await searchService.searchAll({ query, numResults });
      sources = ['google', 'bing', 'gov'];
    } else {
      const source = engine || 'google';
      results = await searchService.search({
        query,
        engine: source,
        numResults,
      });
      sources = [source];
    }

    // TODO: get userId from session/auth
    const userId = 'user-placeholder'; 
    if (userId) {
        await supabase.from('search_history').insert({
          user_id: userId,
          query,
          sources,
          results_count: results.length,
        });
    }

    const response = NextResponse.json({
      query,
      engine: allEngines ? 'all' : (engine || 'google'),
      count: results.length,
      results,
      timestamp: new Date().toISOString(),
    });

    // Cache for 5 minutes on CDN
    response.headers.set('Cache-Control', 'public, s-maxage=300');
    
    return response;

  } catch (error: any) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred.', message: error.message },
      { status: 500 }
    );
  }
}
