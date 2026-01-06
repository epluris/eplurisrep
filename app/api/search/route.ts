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
    const engine = searchParams.get('engine') as any;
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

    return NextResponse.json({
      query,
      engine: allEngines ? 'all' : engine,
      count: results.length,
      results,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error('Search API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Search failed', 
        message: error.message,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}