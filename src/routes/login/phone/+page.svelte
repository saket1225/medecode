<script lang="ts">
  import { onMount } from 'svelte';
  import { auth, signInWithPhoneNumber, RecaptchaVerifier } from '../../login/firebaseconfig';
  import { goto } from "$app/navigation";
  let countryCode = "+91";
  let phoneNumber = '';
  let verificationCode = Array(6).fill('');
  let recaptchaVerifier;
  let confirmationResult;
  let recaptchaCallbackExecuted = false; // Flag to track Recaptcha callback execution
  let otpVerified = false; // Flag to track OTP verification stage
  
  const sendOtp = async () => {
    try {
      const phoneNumberWithCountryCode = `+${countryCode}${phoneNumber}`;
      confirmationResult = await signInWithPhoneNumber(auth, phoneNumberWithCountryCode, recaptchaVerifier);
      otpVerified = true; // Update the flag when OTP is sent
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      // Concatenate the individual digits into a single string
      const formattedVerificationCode = verificationCode.join('');

      // Verify the concatenated code
      await confirmationResult.confirm(formattedVerificationCode);

      console.log('User signed in successfully');
      goto("/chat");
      // You can navigate to the next page or perform other actions here
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  const focusNextInput = (index) => {
    if (index < 5 && verificationCode[index].length === 1) {
      // Move focus to the next input field
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace' && index > 0) {
      // Move focus to the previous input field when Backspace is pressed
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput.focus();
    }
  };

  onMount(() => {
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'normal',
      'callback': (response) => {
        // Ensure the callback is executed only once
        if (!recaptchaCallbackExecuted) {
          recaptchaCallbackExecuted = true;

          // Your logic when Recaptcha is solved, allow signInWithPhoneNumber.
          // ...
          sendOtp(); // Automatically trigger sending OTP after Recaptcha is solved
        }
      },
      'expired-callback': () => {
        // Response expired. Ask the user to solve Recaptcha again.
        // ...
        recaptchaCallbackExecuted = false; // Reset the flag when Recaptcha expires
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
      margin-top: 20px;
      
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
    #phonenum,#country-code-dropdown {
          /* Style for the select element */
          padding: 10px;
          font-size: 16px;
          background-color: #edd2b0;
          color: #071966;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%;
          box-sizing: border-box; /* Ensure padding and border are included in the width */
          -webkit-appearance: menulist; /* Add this line to override default styles */
      }
      
    .otp-input {
      width: 30px; /* Adjust the width as needed */
      margin: 0 5px; /* Adjust the margin between inputs as needed */
      text-align: center;
      background:  #edd2b0;
      color: #071966;
    }
    .otp-input-wrapper {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
  }
  .verifybutton{
    margin-top: 35px;
    background:  #071966;
    color:#ffffff;
  }
  .submit{
    background:  #071966;
    color:#ffffff;
  }
  </style>
 
<div class="phone">
  {#if !otpVerified}
    <div class="medecode-">
      <span>Me</span><span class="decode-">decode_</span>
    </div>

    <div class="create-an-account">
      Please enter your phone number below:
    </div>

    {#if !recaptchaCallbackExecuted}
      <div class="input-wrapper">
        <select id="country-code-dropdown" bind:value={countryCode}>
          <!-- Add your country codes here -->
          <option value="+1">+1 (United States)</option>
      <option value="+44">+44 (United Kingdom)</option>
      <option value="+49">+49 (Germany)</option>
      <option value="+39">+39 (Italy)</option>
      <option value="+81">+81 (Japan)</option>
      <option value="+41">+41 (Switzerland)</option>
      <option value="+1">+1 (Canada)</option>
      <option value="+34">+34 (Spain)</option>
      <option value="+31">+31 (Netherlands)</option>
      <option value="+61">+61 (Australia)</option>
      <option value="+46">+46 (Sweden)</option>
      <option value="+30">+30 (Greece)</option>
      <option value="+45">+45 (Denmark)</option>
      <option value="+47">+47 (Norway)</option>
      <option value="+33">+33 (France)</option>
      <option value="+358">+358 (Finland)</option>
      <option value="+353">+353 (Ireland)</option>
      <option value="+86">+86 (China)</option>
      <option value="+90">+90 (Türkiye)</option>
      <option value="+64">+64 (New Zealand)</option>
      <option value="+92">+92 (Pakistan)</option>
      <option value="+351">+351 (Portugal)</option>
      <option value="+60">+60 (Malaysia)</option>
      <option value="+82">+82 (South Korea)</option>
      <option value="+43">+43 (Austria)</option>
      <option value="+65">+65 (Singapore)</option>
      <option value="+62">+62 (Indonesia)</option>
      <option value="+91" selected>+91 (India)</option>
      <option value="+52">+52 (Mexico)</option>
      <option value="+966">+966 (Saudi Arabia)</option>
      <option value="+55">+55 (Brazil)</option>
      <option value="+66">+66 (Thailand)</option>
      <option value="+27">+27 (South Africa)</option>
      <option value="+54">+54 (Argentina)</option>
      <option value="+84">+84 (Vietnam)</option>
      <option value="+1">+1 (The Bahamas)</option>
      <option value="+212">+212 (Morocco)</option>
      <option value="+20">+20 (Egypt)</option>
      <option value="+7">+7 (Russia)</option>
      <option value="+216">+216 (Tunisia)</option>
      <option value="+962">+962 (Jordan)</option>
      <option value="+973">+973 (Bahrain)</option>
      <option value="+1">+1 (Dominican Republic)</option>
      <option value="+852">+852 (Hong Kong)</option>
      <option value="+32">+32 (Belgium)</option>
      <option value="+853">+853 (Macao)</option>
      <option value="+354">+354 (Iceland)</option>
      <option value="+385">+385 (Croatia)</option>
      <option value="+48">+48 (Poland)</option>
      <option value="+380">+380 (Ukraine)</option>
      <option value="+420">+420 (Czechia)</option>
      <option value="+36">+36 (Hungary)</option>
      <!-- Add more options as needed -->
        </select>
      </div>

      <div class="input-wrapper">
        <input id="phonenum" type="text" bind:value={phoneNumber} placeholder="Phone Number" />
      </div>

      <div id="recaptcha-container"></div>

      <button class="submit" on:click={sendOtp}>Send OTP</button>
    {/if}
  {/if}

  {#if otpVerified}
  <div class="create-an-account">
    We've sent you a security code. Please type it here.
  </div>
    <div class="input-wrapper">
      <div class="otp-input-wrapper">
        {#each Array(6) as _, index}
          <input
            id={`otp-input-${index}`}
            class="otp-input"
            type="text"
            bind:value={verificationCode[index]}
            placeholder="0"
            on:input={() => focusNextInput(index)}
            on:keydown={(event) => handleKeyDown(event, index)}
          />
        {/each}
      </div>
    </div>

    <button class="verifybutton" on:click={verifyOtp}>Verify OTP</button>
  {/if}
</div>
