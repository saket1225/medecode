<script>
  import { onMount } from 'svelte';
  import { auth, firebase } from '../login/firebaseconfig';
  import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
  import { goto } from '$app/navigation';


  
  import phoneIcon from '$lib/images/phone.png';
  async function navphoneauth() {
    goto("/login/phone");
  }

  onMount(async () => {
    try {
      // Handle the redirection and get the result
      const result = await getRedirectResult(auth);

      // If there is a user in the result, navigate to the '/chat' page
      if (result.user) {
        console.log('Google Sign-In Successful:', result.user);
        goto('/chat');
      }
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  });

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      // Start the Google Sign-In process
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Google Sign-In Error:', error.message);
    }
  }
</script>

  

<style>
  .phone {
    position: relative;
    line-height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 22px;
    flex-shrink: 0;
  }

  .use-phone-number {
    font-size: 20px;
    background-color:  #edd2b0;
    position: relative;
    font-size: var(--font-size-3xl);
    font-weight: 500;
    font-family: var(--font-general-sans);
    color: var(--color-midnightblue);
    text-align: left;
    border: none;
    cursor:pointer;
    padding: var(--padding-lg) 50px;
  }

  .phone-parent {
  position: absolute;
  top: calc(42% + 8.96px); /* Adjust the top position */
  left: calc(50% - 237.48px);
  background-color: var(--color-peachpuff);
  width: 509px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: var(--padding-lg) 50px;
  box-sizing: border-box;
  gap: var(--gap-smi);
  cursor: pointer;
  color: var(--labels-primary);
  font-family: var(--font-sf-pro);
}

  .image-15-icon {
    position: relative;
    width: 18px;
    height: 22px;
    object-fit: cover;
  }

  .continue-with-google {
    font-size: 20px;
    position: relative;
    font-weight: 500;
    cursor: pointer;
    background-color:  #edd2b0; /* Customize the background color */
    color:var(--color-midnightblue); /* Customize the text color */
    padding: var(--padding-lg) 50px; /* Customize the padding */
    border: none; /* Remove borders */
  }

  .image-15-parent {
    position: absolute;
    top: calc(45% + 88.96px);
    left: calc(50% - 237.48px);
    background-color: var(--color-peachpuff);
    width: 509px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: var(--padding-lg) 59px;
    box-sizing: border-box;
    gap: var(--gap-smi);
    text-align: left;
    font-size: var(--font-size-3xl);
  }

  .create-an-account {
    position: absolute;
    top: 220px;
    left: calc(50% - 337.93px);
    font-size: 36px;
    font-weight: 500;
    display: inline-block;
    width: 709.91px;
  }

  .decode- {
    font-weight: 600;
    color: #f4bb94;
  }

  .medecode- {
    position: absolute;
    top: 50px;
    left: 105px;
    font-size: 30px;
    text-align: left;
  }

  .login-1 {
    position: relative;
    background-color: #efe3db;
    width: 100%;
    height: 824px;
    overflow: hidden;
    text-align: center;
    font-size: 17px;
    color: var(--color-midnightblue);
    font-family: var(--font-general-sans);
  }

  body {
    margin: 0;
    line-height: normal;
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
<div class="login-1">
    <div class="phone-parent" id="frameContainer">
      <img class="image-15-icon" alt="" src="{phoneIcon}" />
      <button class="use-phone-number" on:click={navphoneauth}>Use phone number</button>
    </div>
    
    <div class="create-an-account">
      Create an account or sign in to manage your health records and save your history
    </div>
    <div class="medecode-">
      <span>Me</span
      ><span class="decode-">decode_</span>
    </div>
  </div>