import { AzureBlobStorage } from 'blob-storage';

const endpoint = process.env.AZURITE_ENDPOINT!;
const account = process.env.AZURITE_ACCOUNT!;
const accountKey = process.env.AZURITE_KEY!;

let blobStorage: AzureBlobStorage | null = null;

export function getBlobStorage(): AzureBlobStorage {
  if (!blobStorage) {
    blobStorage = new AzureBlobStorage({
      endpoint,
      account,
      accountKey,
      container: 'files',
    });
  }

  return blobStorage;
}
