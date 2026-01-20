import { PRISMA } from '@/app/prisma';
import { getBlobStorage } from '../../../blob-storage';

export interface UpdateFileCommand {
  id: string;
  content: string | undefined;
  path?: string;
}

export class UpdateFileFacade {
  public async update({ id, content, path }: UpdateFileCommand) {
    const file = await PRISMA.file.findUniqueOrThrow({
      where: {
        id: id,
      },
    });

    const blobStorage = getBlobStorage();
    const pathChanged = path != null && path !== file.path;

    if (pathChanged) {
      await this.moveEntry({ fileId: id, filePath: file.path, newPath: path, blobStorage });
    }

    if (!file.isFolder && content !== undefined) {
      const targetPath = pathChanged ? path : file.path;
      await blobStorage.put(targetPath, content ?? '');
    }

    if (!pathChanged) {
      await PRISMA.file.update({
        where: {
          id: id,
        },
        data: {
          updatedAt: new Date(),
        },
      });
    }
  }

  private async moveEntry({
    fileId,
    filePath,
    newPath,
    blobStorage,
  }: {
    fileId: string;
    filePath: string;
    newPath: string;
    blobStorage: ReturnType<typeof getBlobStorage>;
  }) {
    if (newPath === filePath) return;

    const file = await PRISMA.file.findUniqueOrThrow({
      where: { id: fileId },
    });

    if (file.isFolder && newPath.startsWith(`${filePath}/`)) {
      throw new Error('Cannot move a folder into one of its descendants');
    }

    if (file.isFolder) {
      const descendants = await PRISMA.file.findMany({
        where: {
          OR: [{ id: fileId }, { path: { startsWith: `${filePath}/` } }],
        },
        orderBy: { path: 'asc' },
      });

      const moves = descendants.map((entry) => {
        const updatedPath =
          entry.id === fileId ? newPath : entry.path.replace(`${filePath}/`, `${newPath}/`);

        return {
          id: entry.id,
          isFolder: entry.isFolder,
          fromPath: entry.path,
          toPath: updatedPath,
        };
      });

      await this.ensurePathsAvailable(
        moves.map((move) => move.toPath),
        moves.map((move) => move.id)
      );

      for (const move of moves.filter(
        (entry) => !entry.isFolder && entry.fromPath !== entry.toPath
      )) {
        await this.copyBlob(blobStorage, move.fromPath, move.toPath);
      }

      await PRISMA.$transaction(
        moves.map((move) =>
          PRISMA.file.update({
            where: { id: move.id },
            data: { path: move.toPath },
          })
        )
      );

      for (const move of moves.filter(
        (entry) => !entry.isFolder && entry.fromPath !== entry.toPath
      )) {
        await this.deleteBlob(blobStorage, move.fromPath);
      }
      return;
    }

    await this.ensurePathsAvailable([newPath], [fileId]);
    await this.copyBlob(blobStorage, filePath, newPath);
    await PRISMA.file.update({
      where: { id: fileId },
      data: { path: newPath },
    });
    await this.deleteBlob(blobStorage, filePath);
  }

  private async ensurePathsAvailable(newPaths: string[], ignoreIds: string[]) {
    const conflict = await PRISMA.file.findFirst({
      where: {
        path: { in: newPaths },
        NOT: { id: { in: ignoreIds } },
      },
      select: {
        path: true,
      },
    });

    if (conflict) {
      throw new Error(`A file or folder already exists at ${conflict.path}`);
    }
  }

  private async copyBlob(
    blobStorage: ReturnType<typeof getBlobStorage>,
    fromPath: string,
    toPath: string
  ) {
    if (fromPath === toPath) return;
    const buffer = await blobStorage.get(fromPath);
    if (!buffer) return;
    await blobStorage.put(toPath, buffer);
  }

  private async deleteBlob(blobStorage: ReturnType<typeof getBlobStorage>, path: string) {
    await blobStorage.delete(path);
  }
}
