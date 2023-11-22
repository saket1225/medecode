import * as universal from '../entries/pages/chat/_page.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chat/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/chat/+page.js";
export const imports = ["_app/immutable/nodes/4.e10cf3a7.js","_app/immutable/chunks/scheduler.c300260d.js","_app/immutable/chunks/index.35e2b7d2.js","_app/immutable/chunks/loadingStore.2b98e002.js","_app/immutable/chunks/index.b7cc8db5.js"];
export const stylesheets = ["_app/immutable/assets/4.e7b0f924.css"];
export const fonts = [];
