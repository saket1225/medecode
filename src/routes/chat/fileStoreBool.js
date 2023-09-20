import { writable } from 'svelte/store';

export const isFileUploaded = writable(false);

export function setFileUploadStatus(status=false) {
  isFileUploaded.set(status);
}
