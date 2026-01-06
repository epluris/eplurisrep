// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchService } from '@/lib/search/searchService';
import { validateSearchConfig } from '@/lib/search/config';

// Validate config on startup
validateSearchConfig();

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
    
    if (allEngines) {
      results = await searchService.searchAll({
        query,
        numResults,
      });
    } else {
      results = await searchService.search({
        query,
        engine: engine || 'google',
        numResults,
      });
    }

    const resultsArray = Array.isArray(results) ? results : [results];

    return NextResponse.json({
      query,
      engine: allEngines ? 'all' : engine,
      count: resultsArray.length,
      results: resultsArray,
      timestamp: new Date().toISOString(),
    });

  } catch (error: unknown) {
    console.error('Search API error:', error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    const stack = process.env.NODE_ENV === 'development' && error instanceof Error ? error.stack : undefined;
    
    return NextResponse.json(
      { 
        error: 'Search failed', 
        message: errorMessage,
        details: stack
      },
      { status: 500 }
    );
  }
}