

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/chat/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.e76c6e0a.js","_app/immutable/chunks/scheduler.c300260d.js","_app/immutable/chunks/index.35e2b7d2.js","_app/immutable/chunks/loadingStore.2b98e002.js","_app/immutable/chunks/index.b7cc8db5.js"];
export const stylesheets = ["_app/immutable/assets/2.255f14d0.css"];
export const fonts = [];
