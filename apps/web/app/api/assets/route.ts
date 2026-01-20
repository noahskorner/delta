import { NextRequest, NextResponse } from 'next/server';
import { CreateAssetFacade } from './create-asset.facade';
import { CreateAssetRequestSchema } from './create-asset.request';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const request = CreateAssetRequestSchema.parse(body);
    const facade = new CreateAssetFacade();
    const response = await facade.create(request);
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : String(error) },
      { status: 400 }
    );
  }
}
