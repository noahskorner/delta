import { uuid } from '@/app/utils/uuid';
import { PRISMA } from '../../prisma';
import { getBlobStorage } from '../../blob-storage';
import { CreateAssetRequest } from './create-asset.request';
import { CreateAssetResponse } from './create-asset.response';

type AssetMetadata = Record<string, unknown>;

export class CreateAssetFacade {
  public async create(request: CreateAssetRequest): Promise<CreateAssetResponse> {
    const metadata = request.metadata ?? {};
    const persistedMetadata = await this.persistAssetMetadata(request.type, metadata);

    const asset = await PRISMA.asset.create({
      data: {
        name: request.name,
        type: request.type,
        metadata: persistedMetadata,
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

  private async persistAssetMetadata(
    type: CreateAssetRequest['type'],
    metadata: AssetMetadata
  ): Promise<AssetMetadata> {
    if (type !== 'file') {
      return metadata;
    }

    const fileName = this.getMetadataString(metadata, 'fileName');
    const contentBase64 = this.getMetadataString(metadata, 'contentBase64');

    if (!fileName || !contentBase64) {
      throw new Error('File assets require metadata.fileName and metadata.contentBase64.');
    }

    const blobPath = `assets/${uuid()}/${fileName}`;
    const blobStorage = getBlobStorage();
    await blobStorage.put(blobPath, Buffer.from(contentBase64, 'base64'));

    const { contentBase64: _contentBase64, ...rest } = metadata;

    return {
      ...rest,
      blobPath,
      fileName,
    };
  }

  private getMetadataString(metadata: AssetMetadata, key: string): string | null {
    const value = metadata[key];
    if (typeof value === 'string' && value.trim().length > 0) {
      return value;
    }

    return null;
  }
}
