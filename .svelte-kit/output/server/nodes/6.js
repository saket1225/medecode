

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/phone/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.98a9cc29.js","_app/immutable/chunks/scheduler.c300260d.js","_app/immutable/chunks/index.35e2b7d2.js","_app/immutable/chunks/navigation.c09491f9.js","_app/immutable/chunks/singletons.01aff40c.js","_app/immutable/chunks/index.b7cc8db5.js"];
export const stylesheets = [];
export const fonts = [];
