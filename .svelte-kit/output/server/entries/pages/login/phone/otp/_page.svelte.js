import { c as create_ssr_component, b as add_attribute } from "../../../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let verificationCode = "";
  return `   <div><input type="text" placeholder="Enter OTP"${add_attribute("value", verificationCode, 0)}> <button data-svelte-h="svelte-s742x3">Verify OTP</button></div>`;
});
export {
  Page as default
};
