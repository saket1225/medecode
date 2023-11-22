import { c as create_ssr_component, a as subscribe } from "../../../chunks/ssr.js";
import { w as writable } from "../../../chunks/index.js";
const isLoading = writable(false);
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".loading.svelte-1tyu2tw{position:absolute;width:125vw;height:100px;z-index:1000;left:-12.5vw;bottom:-20px;display:none;background:linear-gradient(90deg, #F4BB94, #7386F7, #F4BB94);background-size:200%;animation:svelte-1tyu2tw-animate 3s linear infinite, MoveXY 3s ease-in-out infinite alternate;filter:blur(40px);transition:2s all;pointer-events:none}.loading.show.svelte-1tyu2tw{display:block}@keyframes svelte-1tyu2tw-animate{0%,100%{background-position:0%}100%{background-position:200%}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $isLoading, $$unsubscribe_isLoading;
  $$unsubscribe_isLoading = subscribe(isLoading, (value) => $isLoading = value);
  $$result.css.add(css);
  $$unsubscribe_isLoading();
  return `<main>${slots.default ? slots.default({}) : ``}</main> <div class="${["loading svelte-1tyu2tw", $isLoading ? "show" : ""].join(" ").trim()}"></div>`;
});
export {
  Layout as default
};
