import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token } = await request.json();
    
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    
    if (!secretKey) {
      return NextResponse.json(
        { error: 'reCAPTCHA not configured' },
        { status: 500 }
      );
    }

    // Verify with Google
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
      { method: 'POST' }
    );

    const data = await response.json();

    return NextResponse.json({
      success: data.success,
      score: data.score,
      action: data.action,
      timestamp: data.challenge_ts,
      hostname: data.hostname,
    });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}
