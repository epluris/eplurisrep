import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { 
      message: 'Gov endpoint is not yet implemented',
      status: 'Coming soon'
    },
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      message: 'Gov endpoint is not yet implemented',
      status: 'Coming soon'
    },
    { status: 501 } // 501 Not Implemented
  );
}
