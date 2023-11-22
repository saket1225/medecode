<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../../login/firebaseconfig';
  import {goto} from "$app/navigation"
  let countryCode = '';
  let phoneNumber = '';
  let verificationCode = '';
  let recaptchaVerifier;

  const sendOtp = async () => {
    try {
      const phoneNumberWithCountryCode = `+${countryCode}${phoneNumber}`;
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, recaptchaVerifier);
      window.confirmationResult = confirmationResult;
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(verificationCode);
      console.log('User signed in successfully');
      goto("/chat")
      // You can navigate to the next page or perform other actions here
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  onMount(() => {
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
      'expired-callback': () => {
        // Response expired. Ask the user to solve reCAPTCHA again.
        // ...
      }
    });
  });
</script>
<style>
  .phone {
    position: relative;
    background-color: #efe3db;
    width: 100vw; /* Use viewport width to cover the entire screen */
    height: 100vh; /* Use viewport height to cover the entire screen */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center horizontally */
    justify-content: center; /* Center vertically */
    font-size: 17px;
    color: var(--color-midnightblue);
    font-family: var(--font-general-sans);
  }

  .medecode- {
    position: absolute;
    top: 50px;
    left: 105px;
    font-size: 30px;
    text-align: left;
  }

  .decode- {
    font-weight: 600;
    color: #f4bb94;
  }

  .create-an-account {
    font-size: 36px;
    font-weight: 500;
    margin-top: 20px; /* Adjust the top margin as needed */
  }

  .input-wrapper {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px; /* Adjust the top margin between inputs as needed */
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #edd2b0; /* Peach color */
    border-radius: 5px;
    background-color: #fff; /* White background */
  }

  #recaptcha-container {
    /* Add styling for recaptcha container if needed */
    margin-top: 10px; /* Adjust the top margin for recaptcha container */
  }

  button {
    width: 200px;
    padding: 15px;
    margin-top: 10px; /* Adjust the top margin for the button */
    font-size: 18px;
    background-color: #edd2b0; /* Peach color */
    color: var(--color-midnightblue);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  :root {
    /* fonts */
    --font-general-sans: "General Sans";
    --font-sf-pro: "SF Pro";

    /* font sizes */
    --font-size-3xl: 22px;

    /* Colors */
    --color-midnightblue: #071966;
    --color-peachpuff: #edd2b0;
    --labels-primary: #000;

    /* Gaps */
    --gap-smi: 13px;

    /* Paddings */
    --padding-lg: 18px;
  }
</style>

<div class="phone">
  <div class="medecode-">
    <span>Me</span><span class="decode-">decode_</span>
  </div>

  <div class="create-an-account">
    Please enter your phone number below
  </div>

  <div class="input-wrapper">
    <input type="text" bind:value={countryCode} placeholder="Country Code" />
  </div>

  <div class="input-wrapper">
    <input type="text" bind:value={phoneNumber} placeholder="Phone Number" />
  </div>

  <div id="recaptcha-container"></div>

  <button on:click={sendOtp}>Send OTP</button>

  <div class="input-wrapper">
    <input type="text" bind:value={verificationCode} placeholder="Verification Code" />
  </div>

  <button on:click={verifyOtp}>Verify OTP</button>
</div>
