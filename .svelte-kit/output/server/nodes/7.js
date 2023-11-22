

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/phone/otp/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/7.6a1aaaa3.js","_app/immutable/chunks/scheduler.c300260d.js","_app/immutable/chunks/index.35e2b7d2.js"];
export const stylesheets = [];
export const fonts = [];
