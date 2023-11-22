import { c as create_ssr_component, b as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/firebaseconfig.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let countryCode = "";
  let phoneNumber = "";
  let verificationCode = "";
  return `<main><h1 data-svelte-h="svelte-15s8ovc">Phone Authentication</h1> <div><label for="countryCode" data-svelte-h="svelte-1dsttr8">Country Code:</label> <input type="text" id="countryCode"${add_attribute("value", countryCode, 0)}></div> <div><label for="phoneNumber" data-svelte-h="svelte-fkalg8">Phone Number:</label> <input type="text" id="phoneNumber"${add_attribute("value", phoneNumber, 0)}></div> <div id="recaptcha-container"></div> <button data-svelte-h="svelte-xurrwi">Send OTP</button> <div><label for="verificationCode" data-svelte-h="svelte-gi9xaq">Verification Code:</label> <input type="text" id="verificationCode"${add_attribute("value", verificationCode, 0)}></div> <button data-svelte-h="svelte-1vpzkkg">Verify OTP</button></main>`;
});
export {
  Page as default
};
