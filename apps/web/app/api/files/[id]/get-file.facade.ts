import { getBlobStorage } from '@/app/blob-storage';
import { PRISMA } from '../../../prisma';
import { GetFileResponse } from './get-file.response';

export interface GetFileCommand {
  id: string;
}

export class GetFileFacade {
  public async get({ id }: GetFileCommand): Promise<GetFileResponse | null> {
    const file = await PRISMA.file.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        createdAt: true,
        updatedAt: true,
        path: true,
        isFolder: true,
      },
    });

    const blobStorage = getBlobStorage();
    const content = await blobStorage.get(file.path);

    return {
      id: file.id,
      isFolder: file.isFolder,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
      path: file.path,
      content: (content ?? Buffer.alloc(0)).toString(),
    };
  }
}
