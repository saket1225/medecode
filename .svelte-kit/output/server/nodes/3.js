import * as universal from '../entries/pages/_page.js';

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.js";
export const imports = ["_app/immutable/nodes/3.90962a09.js","_app/immutable/chunks/scheduler.c300260d.js","_app/immutable/chunks/index.35e2b7d2.js"];
export const stylesheets = ["_app/immutable/assets/3.2fc68642.css"];
export const fonts = [];
