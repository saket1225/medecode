import { setFileUploadStatus } from './fileStoreBool.js';

export function startOver() {
  location.reload();
  setFileUploadStatus(false);
}
