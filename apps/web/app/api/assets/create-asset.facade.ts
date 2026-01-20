import { PRISMA } from '../../prisma';
import { CreateAssetRequest } from './create-asset.request';
import { CreateAssetResponse } from './create-asset.response';

type AssetMetadata = Record<string, unknown>;

export class CreateAssetFacade {
  public async create(request: CreateAssetRequest): Promise<CreateAssetResponse> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metadata: any = request.metadata ?? {};

    const asset = await PRISMA.asset.create({
      data: {
        name: request.name,
        type: request.type,
        metadata: metadata,
      },
      select: {
        id: true,
        name: true,
        type: true,
        createdById: true,
        createdAt: true,
        updatedById: true,
        updatedAt: true,
        metadata: true,
      },
    });

    return {
      id: asset.id,
      name: asset.name,
      type: asset.type,
      createdById: asset.createdById,
      createdAt: asset.createdAt,
      updatedById: asset.updatedById,
      updatedAt: asset.updatedAt,
      metadata: asset.metadata as AssetMetadata,
    } satisfies CreateAssetResponse;
  }
}
