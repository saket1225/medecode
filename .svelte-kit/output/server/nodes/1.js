

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.46cd0eb2.js","_app/immutable/chunks/scheduler.c300260d.js","_app/immutable/chunks/index.35e2b7d2.js","_app/immutable/chunks/singletons.01aff40c.js","_app/immutable/chunks/index.b7cc8db5.js"];
export const stylesheets = [];
export const fonts = [];
