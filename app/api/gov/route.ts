// app/api/gov/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { govApiService } from '@/lib/gov-apis/govApiService';
import { govApiEndpoints } from '@/lib/gov-apis/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const action = searchParams.get('action');
    const endpoint = searchParams.get('endpoint');
    const query = searchParams.get('q');
    const category = searchParams.get('category');
    const params = searchParams.get('params');

    if (!action) {
      return NextResponse.json(
        { error: 'Action parameter is required' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'search':
        if (!query) {
          return NextResponse.json(
            { error: 'Query parameter "q" is required for search' },
            { status: 400 }
          );
        }
        
        const categories = category ? category.split(',') : [];
        result = await govApiService.search(query, categories);
        break;

      case 'endpoint':
        if (!endpoint) {
          return NextResponse.json(
            { error: 'Endpoint parameter is required' },
            { status: 400 }
          );
        }
        
        const requestParams = params ? JSON.parse(params) : {};
        result = await govApiService.getDataset(endpoint, requestParams);
        break;

      case 'datasets':
        // List available datasets
        result = {
          success: true,
          data: govApiEndpoints.map(ep => ({
            name: ep.name,
            category: ep.category,
            description: ep.description,
            requiresKey: ep.requiresKey,
            example: ep.example,
          })),
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: search, endpoint, or datasets' },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: true,
      action,
      timestamp: new Date().toISOString(),
      ...result,
    });

  } catch (error: any) {
    console.error('Government API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
