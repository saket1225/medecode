import { isLoading } from './loadingStore.js';

export function showLoading() {
  isLoading.set(true);
}

export function hideLoading() {
  isLoading.set(false);
}
