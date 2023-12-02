<!-- OTPVerification.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../../../login/firebaseconfig';
  import {goto} from "$app/navigation"
  import { confirmationResult } from '../+page.svelte';
  let verificationCode = '';
  
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
    const handleVerify = () => {
      // Call the `handleVerifyOTP` function from your main component
    };
  </script>
  
  <style>
  
  .phone {
    position: relative;
    background-color: #efe3db;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
    margin-top: 20px;
  }

  .input-wrapper {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    font-size: 16px;
    box-sizing: border-box;
    border: 1px solid #edd2b0;
    border-radius: 5px;
    background-color: #fff;
  }

  #recaptcha-container {
    margin-top: 10px;
  }

  button {
    width: 200px;
    padding: 15px;
    margin-top: 10px;
    font-size: 18px;
    background-color: #edd2b0;
    color: var(--color-midnightblue);
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  :root {
    --font-general-sans: "General Sans";
    --font-sf-pro: "SF Pro";
    --font-size-3xl: 22px;
    --color-midnightblue: #071966;
    --color-peachpuff: #edd2b0;
    --labels-primary: #000;
    --gap-smi: 13px;
    --padding-lg: 18px;
  }

  #phonenum,
  #country-code-dropdown {
    padding: 10px;
    font-size: 16px;
    background-color: #edd2b0;
    color: #071966;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    -webkit-appearance: menulist;
  }

  .otp-input {
    width: 30px;
    margin: 0 5px;
    text-align: center;
  }

  .verification-section {
    display: flex;
    flex-direction: column;
  }

  .verification-section[hidden] {
    display: none;
  }

  .hide {
    display: none;
  }
</style>
    

  
  <div>
    <div >
      <input type="text" bind:value={verificationCode} placeholder="Verification Code" />
    </div>
  
    <button on:click={verifyOtp}>Verify OTP</button>
  </div>
  