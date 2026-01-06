// app/api/gov/dataset/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { govApiService } from '@/lib/gov-apis/govApiService';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const dataset = searchParams.get('name');
    const params = searchParams.get('params');

    if (!dataset) {
      return NextResponse.json(
        { error: 'Dataset name parameter is required' },
        { status: 400 }
      );
    }

    const requestParams = params ? JSON.parse(params) : {};
    const result = await govApiService.getDataset(dataset, requestParams);

    return NextResponse.json({
      success: result.success,
      dataset,
      timestamp: new Date().toISOString(),
      data: result.data,
      metadata: result.metadata,
      error: result.error,
    });

  } catch (error: any) {
    console.error('Dataset API error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}